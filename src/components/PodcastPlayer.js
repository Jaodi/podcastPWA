import React from 'react';
import PropTypes from 'prop-types';
import './PodcastPlayer.css';
import { connect } from 'react-redux';

const PodcastPlayer = ({ selectedEpisode }) => {
  const isHidden = !selectedEpisode;

  return isHidden ? null :
    <div className='podcast-view podcast-player'>
    </div>
}

PodcastPlayer.PropTypes = {
  selectedEpisode: PropTypes.object,
}

const ConnectedPodcastPlayer = connect(state => ({
  selectedEpisode: state.displayedEpisodes[state.selectedEpisode]
}))(PodcastPlayer)

export {
  ConnectedPodcastPlayer
}