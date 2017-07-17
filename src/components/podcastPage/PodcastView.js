import React from 'react';
import PropTypes from 'prop-types';
import './PodcastView.css';
import { ItemBanner } from '../layout/ItemBanner';

const PodcastView = ({
  description, 
  entries = [], 
  icon, 
  link, 
  selectItem,
  selectedEpisode, 
  title
}) => 
  <div>
    <ItemBanner
      title={title}
    >
      <img src={icon} className='podcast-icon' alt='podcast icon' />
      <div className='podcast-details'>
        <span className='podcast-desctiption'>{description}</span>
        <a href={link} className='podcast-link'>{link}</a>
      </div>
    </ItemBanner>
  <ul className='episode-list'>{
    entries.map(entry => 
      <PodcastEntry
        pubDate={entry.pubDate}
        title={entry.title}
        link={entry.link}
        key={entry.guid}
        guid={entry.guid}
        isSelected={entry===selectedEpisode}
        onClick={() => selectItem(entry.guid)}
      />
    )
  }</ul>
</div>

const PodcastEntry = ({pubDate, title, link, guid, isSelected, onClick}) => <li>
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
  selectItem: PropTypes.func,
}

export { PodcastView };