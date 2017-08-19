import React from 'react';
import './ItemBanner.css';

const ItemBanner = ({title, children}) =>   
  <div className='item-banner'>
    <h1 className='item-banner__title'>{title}</h1>
    {children}
  </div>

export {  
  ItemBanner
}
