import React from 'react';
import PropTypes from 'prop-types';
import './PodcastPlayer.css';
import { connect } from 'react-redux';
import { ItemBanner } from './layout/ItemBanner';

const PodcastPlayer = ({ selectedEpisode }) => {
  const isHidden = !selectedEpisode;
  const { pubDate, title, link, enclosure = {} } = selectedEpisode || {};
  const { url: audioUrl, type } = enclosure;

  return isHidden ? null :
    <ItemBanner
      title={title}
    >
      <span>{`${pubDate} ${link}`}</span>
      <audio 
        key={audioUrl} 
        controls='controls' 
        preload='none'
        className='player-audio'
      >
        Your browser does not support the <code>audio</code> element.
        <source src={audioUrl} type={type} />
      </audio>
    </ItemBanner>
}

PodcastPlayer.PropTypes = {
  selectedEpisode: PropTypes.object,
}

const ConnectedPodcastPlayer = connect(state => ({
  selectedEpisode: state.selectedEpisode
}))(PodcastPlayer)

export {
  ConnectedPodcastPlayer
}