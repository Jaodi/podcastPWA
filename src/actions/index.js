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

export const removeSubscription = id => {
  return {
    type: 'REMOVE_SUBSCRIPTION',
    id
  }
}

export const addSubscription = id => {
  return {
    type: 'ADD_SUBSCRIPTION',
    id
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
