const { differenceWith, eqBy, prop } = require('ramda');
const { updatePodcast, getPodcast, getPodcastPreviews } = require('./db/podcasts');
const { createOrUpdate, addPodcastSubscription, getUsersToNotify, updateNotifiedSubscritions } = require('./db/subscriptions');
const { sendPush } = require('./sendPush');
const { rssParser } = require('./rssParser');

const checkAllUpdates = timeout => {
  setTimeout(async () => {
    const previews = await getPodcastPreviews();
    await Promise.all(previews.map(({ id }) => processSinglePodcast(id)));
    checkAllUpdates(timeout);
  }, timeout)
}

const getUpdatedEntries = differenceWith(eqBy(prop('guid')));

const processSinglePodcast = async podcastID => {
  const { entries, rssLink } = await getPodcast(podcastID);
  const updatedPodcast = await rssParser(rssLink);
  //TODO make something better than taking one at random
  const [ updatedEntry ] = getUpdatedEntries(updatedPodcast.entries, entries);
  if (updatedEntry) {
    updatePodcast(updatedPodcast);
    const users = await getUsersToNotify(podcastID);
    // save to subscription that this episode was the last one udated
    updateNotifiedSubscritions(users.map(prop('userID')), podcastID);
    sendPush(users.map(prop('endpoint')))
  }
  return; 
}

module.exports = {
  checkAllUpdates
}