export const selectItem = index => {
  return {
    type: 'SELECT_ITEM',
    index
  }
}

export const openPodcast = podcast => {
  return {
    type: 'OPEN_PODCAST',
    podcast
  }
}
