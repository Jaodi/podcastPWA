import React from 'react';
import { Link } from 'react-router-dom';

const Preview = ({ description, entries, icon, link, selectedEpisode, title, id }) => <li> 
    <Link to={`/podcast/${id}`} >
      <span>{title}</span>
      <span>{description}</span>
    </Link>
  </li>

  //  description={description}
  //   entries={entries}
  //   icon={icon}
  //   link={link}
  //   selectedEpisode={selectedEpisode}
  //   title={title} 
 
export {
  Preview
}