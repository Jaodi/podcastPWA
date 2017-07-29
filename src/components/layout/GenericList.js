import React from 'react';
import './GenericList.css';

const GenericList = ({items}) => 
  <ul className='generic-list'> 
    {items.map((item, index) =>
      <li
        className='generic-list__item' 
        key={index}
      >
        {item}
        <hr />
      </li>
    )}
  </ul>

export {
  GenericList
}