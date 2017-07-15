const podcastApp = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_ITEM': 
      return {
        ...state,
        selectedEpisode: action.index
      }
    default:
      return state
  }
}

export {
  podcastApp
}