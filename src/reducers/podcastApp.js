import { map, find, propEq } from 'ramda';
import { mapPath } from '../utils/ramdaExt';
import { USER_ID_STORAGE_KEY } from '../utils/getUserID';

const parseDate = dateString => {
  const parsed = new Date(dateString);
  if (isNaN(parsed)) {
    return false;
  }
  return parsed;
} 
const processEntry = mapPath(parseDate, ['pubDate'])
const processEntries = map(processEntry)
const processPodcast = mapPath(processEntries, ['entries'])
const findEpisode = (guid, displayedEpisodes) => 
  find(propEq('guid', guid), displayedEpisodes)

// const initState = {
//   userID: localStorage && localStorage.getItem(USER_ID_STORAGE_KEY)
// }

const podcastApp = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_PODCAST':
      const parsed = processPodcast(action.podcast);
      return {
        ...state,
        ...parsed,
        displayedEpisodes: parsed.entries,
      }
    case 'SELECT_ITEM': 
      return {
        ...state,
        selectedEpisode: findEpisode(action.guid, state.displayedEpisodes)
      }
    case 'OPEN_PREVIEWS':
      return {
        ...state,
        previews: action.previews
      }
    case 'SET_USER_ID':
      return {
        ...state,
        userID: action.userID
      }
    default:
      return state
  }
}


export { podcastApp }