import React from 'react';
import { Link } from 'react-router-dom';
import './Preview.css';

const Preview = ({ description, entries, icon, link, selectedEpisode, title, id }) => <div className='preview'> 
    <Link 
      to={`/podcast/${id}`} 
      className='preview-link'
    >
      <span>{title}</span>
      <span>{description}</span>
    </Link>
  </div>

  //  description={description}
  //   entries={entries}
  //   icon={icon}
  //   link={link}
  //   selectedEpisode={selectedEpisode}
  //   title={title} 
 
export {
  Preview
}