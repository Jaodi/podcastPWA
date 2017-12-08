const webpush = require('web-push');
const { logError } = require('./logError');

webpush.setVapidDetails('mailto:niairobi@gmail.com',
 'BEpKdtyAw9rTVeV4L74aWbDGPCrzCqDexT4OKYG4wtPbThBTTNypV4wlGBlHcvtqDS1thfqXSs7CXS5q-y5CXaI',
 '08wUaWbACuKu7N6pJMx0mZ3DQcadERAd5bnFfLedKdg' )

const sendPush = async subscriptions => 
  Promise.all(subscriptions.map(
    subscription => webpush.sendNotification(subscription, '123').catch(logError)
  ))
    .then(console.log)
    .catch(logError)

module.exports = { sendPush };
