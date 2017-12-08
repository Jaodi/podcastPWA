const apiApp = require('express').Router();
const bodyParser = require('body-parser');
const { checkRssLink } = require('./checkRssLink');
const { sendPush } = require('./sendPush');
const { checkAllUpdates } = require('./checkUpdates');
// TODO split api methods into couple of files
const { savePodcast, getPodcast, getPodcastPreviews, getLastEpisode } = require('./db/podcasts');
const { createOrUpdate, addPodcastSubscription, getUsersToNotify, getLastUpdate } = require('./db/subscriptions');
const uuidv4 = require('uuid/v4');

apiApp.post('/checkRssLink', bodyParser.json(), async function (req, res, next) {
  console.log(req.body);
  try {
    const podcast = await checkRssLink(req.body);

    const podcastId = await savePodcast(podcast);
    res.json({id: podcastId});
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.post('/saveEndpoint', bodyParser.json(), async function (req, res, next) {
  try {
    const { userID, subscription } = req.body;
    createOrUpdate(userID, subscription);
    console.log(`new user with id "${userID}" subscribed`);
    res.json('success');
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.get('/podcast', async function (req, res, next) {
  try {
    const podcastId = req.query.id;
    const podcast = await getPodcast(podcastId);
    console.log(`podcast ${podcast.title} retrived`);
    res.json(podcast);
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.get('/podcastPreviews', async function (req, res, next) {
  try {
    const previews = await getPodcastPreviews();
    console.log(`retrived ${previews.length} previews`);
    res.json(previews);
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.get('/getLastEpisode', async function (req, res, next) {
  try {
    const { userID } = req.query;
    const podcastID = await getLastUpdate(userID);
    const lastEpisode = await getLastEpisode(podcastID);
    res.json(lastEpisode);
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.get('/userID', (req, res) => {
  res.json({id: uuidv4()});
});

apiApp.get('/addSubscription', (req, res) => {
  const { userID, podcastID } = req.query;

  addPodcastSubscription(userID, podcastID)
  res.json('success');
});

apiApp.get('/removeSubscription', (req, res) => {
  res.json({id: uuidv4()});
});

apiApp.get('/notifyPodcastSubscribers', async (req, res) => {
  try {
    const { podcastID } = req.query;
    const users = await getUsersToNotify(podcastID);
    sendPush(users.map(el=>el.subscription));
    res.send('success');
  } catch (e) {
    res.send(`error occurred notifying clients ${e}`);
  }
});

checkAllUpdates(1000*60*5);

module.exports = {
  apiApp
}
