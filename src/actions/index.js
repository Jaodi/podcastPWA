import { fetchApi } from '../utils/fetchApi';

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

export const loadPodcast = id => dispatch => {
  return fetch(`/api/podcast?id=${id}`)
    .then(res => res.json())
    .then(podcast => dispatch(openPodcast(podcast)));
}