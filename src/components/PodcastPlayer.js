import React from 'react';
import PropTypes from 'prop-types';
import './PodcastPlayer.css';
import { connect } from 'react-redux';
import { ItemBanner } from './layout/ItemBanner';
import { getMMSS } from '../utils/dateFormater';

const steps = 500;

const PodcastPlayer = ({ selectedEpisode }) => {
  const isHidden = !selectedEpisode;
  const { pubDate, title, link, enclosure = {} } = selectedEpisode || {};
  const { url: src, type } = enclosure;

  return isHidden ? null :
    <ItemBanner
      title={title}
    >
      <div className='podcast-player'> 
        <span className='podcast-player__item'>{`${pubDate && pubDate.toDateString()}`}</span>
        {/* <a href={link} className='podcast-player__item'>{`${link.slice(0, 35)}...`}</a> */}
        <AudioPlayer src={src} type={type} key={src}/>
      </div>
    </ItemBanner>
}

PodcastPlayer.PropTypes = {
  selectedEpisode: PropTypes.object,
}

class AudioPlayer extends React.PureComponent{
  constructor(props){ 
    super(props);
    this.state = {
      progress: 0,
      remaining: 0
    }
  }

  clickPlaypause = () => {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  sliderChanged = e => {
    const progress = e.target.value;
    
    this.setState({progress});
    this.audio.currentTime = progress * this.audio.duration; 
  }

  timeUpdateListener = () => {
    if (this.audio.duration){
      const progress = this.audio.currentTime / this.audio.duration;
      const remaining = this.audio.duration - this.audio.currentTime;

      this.setState({
        progress, 
        remaining
      });
    }
  }

  render = () => {
    const {src, type} = this.props;
    const {remaining, progress} = this.state;

    return <div className='audio-player'>
      <audio 
        ref={audio => this.audio = audio}
        className='audio-player__audio'
        onTimeUpdate={this.timeUpdateListener}
      >
        Your browser does not support the <code>audio</code> element.
        <source src={src} type={type} />
      </audio>  
      <button
        className='audio-player__playpause' 
        onClick={this.clickPlaypause}
      />
      <input
        value={progress}
        onChange={this.sliderChanged}
        className='audio-player__range' 
        type="range"
        step={1/steps}
        min={0}
        max={1}
      />
      <span className='audio-player__lefttoplay'>{getMMSS(remaining*1000)}</span>
    </div>
  }
}

const ConnectedPodcastPlayer = connect(state => ({
  selectedEpisode: state.selectedEpisode
}))(PodcastPlayer)

export {
  ConnectedPodcastPlayer
}