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
