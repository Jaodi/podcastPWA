const { getCollection, insert, aggregate, update, updateOrInsert, execQuery } = require('./helpers');

const createOrUpdate = async (userID, subscription) => {
  const collection = await getCollection('subscription');
  
  await updateOrInsert(collection, {userID}, {userID, subscription});
  console.log(`saved ${userID}'s endpoint`);
  // dedupe with existing subscriptions
  // save if there is no repetition
}

const addPodcastSubscription = async (userID, podcastID) => {
  const collection = await getCollection('podcastSubscription'); 
  await updateOrInsert(collection, {userID}, {userID, podcastID});
  console.log(`saved ${userID}'s subscriptions to ${podcastID}`);
}

const getUsersToNotify = async podcastID => {
  const podcastSubscriptions = await getCollection('podcastSubscription');
  const userSubscriptions = await aggregate(podcastSubscriptions, [
    {$match: {podcastID}},
    {$lookup: {
      from: 'subscription',
      localField: 'userID',
      foreignField: 'userID',
      as: 'subscription'
    }},
    {$project: {
        'subscription': '$subscription'
    }}
  ]);
  return userSubscriptions.reduce((acc, el) => acc.concat(el.subscription) ,[]);
}

const updateNotifiedSubscritions = async (userIDs, podcastID) => {
  const subscriptions = await getCollection('subscription');
  await update(
    subscriptions,
    {
      userID: {$in: userIDs}
    },
    {$set: {
      lastUpdated: podcastID
    }},
    {
      multi: true
    }
  );
}

const getLastUpdate = async userID => {
  const subscriptions = await getCollection('podcastSubscription');
  const result = await execQuery(subscriptions, {userID});

  return result && result[0] && result[0].podcastID;
}

module.exports = {
  createOrUpdate,
  addPodcastSubscription,
  getUsersToNotify,
  updateNotifiedSubscritions,
  getLastUpdate,
}