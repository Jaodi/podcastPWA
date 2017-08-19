const gcm = require('node-gcm');
const { logError } = require('./logError');
const key = process.env.GCM_KEY;

const gcmEndpointPrefix = 'https://android.googleapis.com/gcm/send';  

const getRegistrationID = endpoint => {
  if (endpoint.startsWith(gcmEndpointPrefix)){
    const endpointParts = endpoint.split('/')
    const registrationId = endpointParts[endpointParts.length - 1];
    return registrationId;
  }
  return false;
}

const gcmPromise = registartionIDs => new Promise((resolve, reject) => {
    const sender = new gcm.Sender(key);
    const message = new gcm.Message({
        vasya: 123
    });   
    sender.send(message, { registrationTokens: registartionIDs }, function (err, response) {
	    if (err) reject(err);
	    else resolve(response);
    });

})

const sendPush = async endpoints => {
  const registartionIDs = endpoints.reduce((acc, el) => {
    const registartionID = getRegistrationID(el);
    if (registartionID) return acc.concat([registartionID]);
    return acc;
  }, [])
  try{
    await gcmPromise(registartionIDs);
  } catch (e) {
    logError(e);
  }
}

module.exports = { sendPush };
