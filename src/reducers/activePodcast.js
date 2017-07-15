import { map } from 'ramda';
import { mapPath } from '../utils/ramdaExt';

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

const activePodcast = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_PODCAST':
      const parsed = processPodcast(action.podcast);
      return {
        ...state,
        ...parsed,
        displayedEpisodes: parsed.entries,
      }
    default:
      return state
  }
}

export {
  activePodcast
}