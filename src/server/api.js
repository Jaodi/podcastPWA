const apiApp = require('express')();
const bodyParser = require('body-parser');
const { subscriptions } = require('./subscriptionStorage');
const { checkRssLink } = require('./checkRssLink');
const { sendPush } = require('./sendPush');
const { savePodcast, getPodcast, getPodcastPreviews } = require('./db/podcasts');
const uuidv4 = require('uuid/v4');

apiApp.post('/checkRssLink', bodyParser.json(), async function (req, res, next) {
  console.log(req.body);
  try {
    const podcast = await checkRssLink(req.body);

    const podcastId = await savePodcast(podcast);
    res.json({id: podcastId});
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.post('/subscription', bodyParser.json(), async function (req, res, next) {
  try {
    if (req.body.endpoint.startsWith('https://android.googleapis.com/gcm/send')){
      const endpointParts = req.body.endpoint.split('/')
      const registrationId = endpointParts[endpointParts.length - 1];
      subscriptions.push(registrationId);
      console.log(`registrationId is ${registrationId}`);
    }
    res.json(req.body);
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

apiApp.get('/userID', (req, res) => {
  res.json({id: uuidv4()});
});

apiApp.get('/sendPush', (req, res) => {
  sendPush(subscriptions);
});



apiApp.listen(4000);
