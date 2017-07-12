const gcm = require('node-gcm');
const logError = require('./logError');
const key = process.env.GCM_KEY;

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

const sendPush = async registartionIDs => {
  try{
    await gcmPromise(registartionIDs);
  } catch (e) {
    logError(e);
  }
}

module.exports = { sendPush };