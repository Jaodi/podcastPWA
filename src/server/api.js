const apiApp = require('express')();
const bodyParser = require('body-parser');
const { subscriptions } = require('./subscriptionStorage');
const { checkRssLink } = require('./checkRssLink');
const { sendPush } = require('./sendPush');

apiApp.post('/checkRssLink', bodyParser.json(), async function (req, res, next) {
  console.log(req.body);
  try {
    const parsedFeed = await checkRssLink(req.body);

    res.json(parsedFeed);
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

apiApp.get('/sendPush', (req, res) => {
  sendPush(subscriptions);
})

apiApp.listen(4000);
