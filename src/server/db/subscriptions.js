export const saveSubscription = () => {
  // dedupe with existing subscriptions
  // save if there is no repetition
}

export const getUserSubsriptions = () => {
  // by subscription endpoint or by a userid get all his subscriptions
  // somewhere close to startup, so that ui would represent the state of them
}

export const getSubscriptionsToNotify = (podcast) => {
  // get all subscriptions to a podcast
}

export const updateNotifiedSubscritions = (podcast) => {
  // update last notification date for all subscriptions to updated podcast
}

export const getLastNotificationGuid = () => {
  // get last updated podcast for a user to attempt a targeted redirect from the notification
}