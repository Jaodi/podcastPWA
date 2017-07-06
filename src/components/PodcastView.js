import React from 'react';
import PropTypes from 'prop-types';

const PodcastView = ({title}) => <div>
  <span>{title}</span>
</div>

PodcastView.PropTypes = {
  title: PropTypes.string
}

export { PodcastView };