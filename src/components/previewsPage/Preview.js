import React from 'react';
import { Link } from 'react-router-dom';
import './Preview.css';

const Preview = ({ description, entries, icon, link, selectedEpisode, title, id }) => 
  <Link 
    to={`/podcast/${id}`} 
    className='preview'
  >
    <div className='preview__title'>{title}</div>
    <div>{description}</div>
  </Link>


  //  description={description}
  //   entries={entries}
  //   icon={icon}
  //   link={link}
  //   selectedEpisode={selectedEpisode}
  //   title={title} 
 
export {
  Preview
}