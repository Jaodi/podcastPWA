import React from 'react';
import './ItemBanner.css';

const ItemBanner = ({title, children}) =>   
  <div className='item-banner'>
    <span className='item-banner__title'>{title}</span>
    {children}
  </div>

export {
  ItemBanner
}
