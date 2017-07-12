import { map } from 'ramda';
import { mapPath } from '../utils/ramdaExt';

const parseDate = dateString => {
  const parsed = new Date(dateString);
  if (isNaN(parsed)) {
    return false;
  }
  return parsed;
} 

const processEntry = mapPath(parseDate, 'pubDate')

const processEntries = map(processEntry)

const processPodcast = mapPath(processEntries, 'entries')

const podcast = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_PODCAST':
      const processed = processPodcast(action.podcast);
      return {
        ...processed,
        displayedEpisodes: processed.entries,
      }
    case 'SELECT_ITEM': 
      return {
        selectedEpisode: state.displayedEpisodes[action.index]
      }
    default:
      return state
  }
}

export { podcast }