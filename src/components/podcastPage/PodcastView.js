import React from 'react';
import PropTypes from 'prop-types';
import './PodcastView.css';
import { ItemBanner } from '../layout/ItemBanner';
import { GenericList } from '../layout/GenericList';
import { getSinceString } from '../../utils/dateFormater';
import { HowItWorksLink } from '../HowItWorksLink';

const PodcastView = ({
  description, 
  entries = [], 
  icon, 
  link, 
  selectItem,
  selectedIndex,
  subscribe, 
  title
}) => 
  <div>
    <ItemBanner
      title={title}
    >
      <div className='podcast-view'>
        {icon && <img src={icon} className='podcast-view__icon' alt='podcast icon' />}
        <div className='podcast-view__details'>
          <span className='podcast-view__description'>{description}</span>
          <a href={link} className='podcast-view__link'>{link}</a>
        </div>
        <div className="podcast-view__subscribe">
          <button
            className='podcast-view__subscribe__button' 
            onClick={() => subscribe()}
          >
            subscribe to podcast
          </button>
          <HowItWorksLink section='subscription' />
        </div>
      </div>
    </ItemBanner>
    <GenericList 
      items={entries.map((entry, index) => 
        <PodcastEntry
          pubDate={entry.pubDate}
          title={entry.title}
          isSelected={selectedIndex === index}
          guid={entry.guid}
          onClick={() => selectItem(entry.guid)}
        />)
      }
    />
</div>

const PodcastEntry = ({pubDate, title, isSelected, guid, onClick}) => 
  <div 
    className={'podcast-entry' + (isSelected ? ' podcast-entry_selected' : '')}
    onClick={onClick}
  >
    <span className='podcast-entry__date'>{pubDate && getSinceString(pubDate)}</span>
    <span className='podcast-entry__title'>{title}</span>
  </div>

PodcastView.PropTypes = {
  description: PropTypes.string,
  entries: PropTypes.array,
  // icon: PropTypes.string,
  link: PropTypes.string,
  selectedIndex: PropTypes.number,
  title: PropTypes.string,
  selectItem: PropTypes.func,
  subscribe: PropTypes.func,
}

export { PodcastView };