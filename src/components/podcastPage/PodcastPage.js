import React from 'react';
import { connect } from 'react-redux';
import { selectItem, loadPodcast, subscribeTo, unsubscribeFrom } from '../../actions/index';
import { PodcastView } from './PodcastView';

const PodcastPageView = ({
  description,
  entries,
  icon,
  id,
  link,
  loadPodcast,
  match,
  selectItem,
  selectedIndex,
  subscribe,
  title,
  userID
}) => {
  if (match.params && match.params.id && match.params.id !== id) {
    loadPodcast(match.params.id);

    return <span>Podcast is being loaded</span>
  }
  return <PodcastView 
    description={description}
    entries={entries}
    icon={icon}
    link={link}
    selectedIndex={selectedIndex}
    title={title} 
    selectItem={selectItem}
    subscribe={() => subscribe(userID ,id)}   
  />
}

const PodcastPage = connect(state => {
  const selectedIndex = state.displayedEpisodes &&
    state.displayedEpisodes.reduce((prev, el, index) =>
      el===state.selectedEpisode ? index : prev
    , undefined)
  
  return {
    description: state.description,
    entries: state.displayedEpisodes,
    icon: state.icon,
    link: state.link,
    selectedIndex,
    title: state.title,
    id: state.id,
    userID: state.userID
  }
}, dispatch => ({
  selectItem: index => dispatch(selectItem(index)),
  loadPodcast: id => dispatch(loadPodcast(id)),
  subscribe: (userID, podcastID) => dispatch(subscribeTo(userID, podcastID)),
  unsubscribe: (userID, podcastID) => dispatch(unsubscribeFrom(userID, podcastID))
  })
)(PodcastPageView)

export {
  PodcastPage
}