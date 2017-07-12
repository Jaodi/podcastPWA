import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PodcastView.css';
import { selectItem } from '../actions/index';

// import { selectedEpisode, selectEpisode } from '../uiState';

const PodcastView = ({icon, description, link, title, entries = [], selectedEpisode, selectItem}) => <div>
  <div className='podcast-view'>
    <span className='podcast-title'>{title}</span>
    <img src={icon} className='podcast-icon' alt='podcast icon' />
    <div className='podcast-details'>
      <span className='podcast-desctiption'>{description}</span>
      <a href={link} className='podcast-link'>{link}</a>
    </div>
  </div>
  <ul className='episode-list'>{
    entries.map((entry, index) => 
      <PodcastEntry
        pubDate={entry.pubDate}
        title={entry.title}
        link={entry.link}
        key={index}
        index={index}
        isSelected={index===selectedEpisode}
        onClick={() => selectItem(index)}
      />
    )
  }</ul>
</div>

const PodcastEntry = ({pubDate, title, link, index, isSelected, onClick}) => <li>
  <span 
    className={`podcast-entry${isSelected ? ' podcast-entry-selected' : ''}`}
    onClick={onClick}
  >
    {`${pubDate ? pubDate.toDateString() : ''} ${title} ${link}`} 
  </span>
  <hr/>
</li>

PodcastView.PropTypes = {
  description: PropTypes.string,
  entries: PropTypes.array,
  icon: PropTypes.string,
  link: PropTypes.string,
  selectedEpisode: PropTypes.number,
  title: PropTypes.string,
  selectItem: PropTypes.func
}

const PodcastPage = connect(state => ({
  description: state.description,
  entries: state.displayedEpisodes,
  icon: state.icon,
  link: state.link,
  selectedEpisode: state.selectedEpisode,
  title: state.title,
}), dispatch => ({
  selectItem: index => dispatch(selectItem(index))
})
)(PodcastView)

export { PodcastPage };