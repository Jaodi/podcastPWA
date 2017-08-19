import { subscribe as swSubscribe } from '../registerServiceWorker';

export const selectItem = guid => {
  return {
    type: 'SELECT_ITEM',
    guid
  }
}

export const openPodcast = podcast => {
  return {
    type: 'OPEN_PODCAST',
    podcast
  }
}

export const openPreviews = previews => {
  return {
    type: 'OPEN_PREVIEWS',
    previews
  }
}

export const setPushEndpoint = endpoint => {
  return {
    type: 'SET_PUSH_ENDPOINT',
    endpoint
  }
}

export const unsubscribe = id => {
  return {
    type: 'UNSUBSCRIBE_FROM',
    id
  }
}

export const subscribe = id => {
  return {
    type: 'SUBSCRIBE_TO',
    id
  }
}

export const getSubscriptions = () => {
  return {
    type: 'GET_SUBSCRIPTIONS'
  }
}

export const setUserID = userID => {
  return {
    type: 'SET_USER_ID',
    userID
  }
}

export const loadPodcast = id => dispatch => 
  fetch(`/api/podcast?id=${id}`)
    .then(res => res.json())
    .then(podcast => dispatch(openPodcast(podcast)))

export const loadPodcastPreviews = () => dispatch =>
  fetch('/api/podcastPreviews')
    .then(res => res.json())
    .then(previews => dispatch(openPreviews(previews)))

export const subscribeTo = (userID, podcastID) => async dispatch => {
  const notificationsEnabled = await swSubscribe();

  if (notificationsEnabled) {
    const subscription = await fetch(`/api/addSubscription?podcastID=${podcastID}&userID=${userID}`);
    subscription && dispatch(subscribe(podcastID));
  }
}

export const unsubscribeFrom = (userID, podcastID) => async dispatch => {
  const notificationsEnabled = await swSubscribe();

  if (notificationsEnabled) {
    const subscription = await fetch(`/api/unsubscribeFrom?podcastID=${podcastID}&userID=${userID}`);
    subscription && dispatch(unsubscribe(podcastID));
  }
}