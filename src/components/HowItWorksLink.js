import React from 'react'
import { Link } from 'react-router-dom';
import './HowItWorksLink.css';

export const HowItWorksLink = ({section = ''}) => <Link
  className='how-it-works-link'
  to={`/howItWorks${section && ('#'+section)}`}
>
how it works
</Link>