import React from 'react';
import { connect } from 'react-redux';
import { selectItem, loadPodcast, addSubscription } from '../../actions/index';
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
  title
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
    subscribe={() => subscribe(id)}   
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
  }
}, dispatch => ({
  selectItem: index => dispatch(selectItem(index)),
  loadPodcast: id => dispatch(loadPodcast(id)),
  subscribe: id => dispatch(addSubscription(id))
  })
)(PodcastPageView)

export {
  PodcastPage
}