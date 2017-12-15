const { differenceWith, eqBy, prop } = require('ramda');
const { updatePodcast, getPodcast, getPodcastPreviews } = require('./db/podcasts');
const { getUsersToNotify, updateNotifiedSubscritions } = require('./db/subscriptions');
const { sendPush } = require('./sendPush');
const { rssParser } = require('./rssParser');
const { logError } = require('./logError');

const checkAllUpdates = timeout => {
  setTimeout(async () => {
    const start = Date.now();
    logError('update started')
    const previews = await getPodcastPreviews();
    await Promise.all(previews.map(({ id }) => processSinglePodcast(id)));
    logError(`update finished in ${Date.now() - start}ms`);
    checkAllUpdates(timeout);
  }, timeout)
}

const getUpdatedEntries = differenceWith(eqBy(prop('guid')));

const processSinglePodcast = async podcastID => {
  const { entries, rssLink } = await getPodcast(podcastID);
  const updatedPodcast = await rssParser(rssLink);
  const [ updatedEntry ] = getUpdatedEntries(updatedPodcast.entries, entries);
  if (updatedEntry) {
    updatePodcast(updatedPodcast);
    const users = await getUsersToNotify(podcastID);
    // save to subscription that this episode was the last one udated
    updateNotifiedSubscritions(users.map(prop('userID')), podcastID);
    sendPush(users.map(prop('subscription')))
  }
  return; 
}

module.exports = {
  checkAllUpdates
}