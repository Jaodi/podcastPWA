import React from 'react';
import { connect } from 'react-redux';
import { selectItem, loadPodcast } from '../../actions/index';
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
  selectedEpisode,
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
    selectedEpisode={selectedEpisode}
    title={title} 
    selectItem={selectItem}   
  />
}

const PodcastPage = connect(state => ({
  description: state.description,
  entries: state.displayedEpisodes,
  icon: state.icon,
  link: state.link,
  selectedEpisode: state.selectedEpisode,
  title: state.title,
  id: state.id,
}), dispatch => ({
  selectItem: index => dispatch(selectItem(index)),
  loadPodcast: id => dispatch(loadPodcast(id))
})
)(PodcastPageView)

export {
  PodcastPage
}