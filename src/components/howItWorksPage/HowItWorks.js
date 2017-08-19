import React from 'react';
import { connect } from 'react-redux';

const title = 'How this site works';

const content = [
  {
    text: 'It works offline on newer browsers, because it caches both itself and the podcast`s audio you playback.'
  },
  {
    text: 'Moreover, it loads new episodes of the podcasts you subscribe to, whenever they come out.'
  },
  {
    text: 'It can be saved to homescreen and used without browser navigation to mimmick the look and feel of a native app'
  }
]

const underTheHood = [
  {
    text: 'This web application extensively uses service-worker capabilities. It has two distinct caching strategies: agressivly cache app shell and media content, while always giving an attempt at loading the newest podcast feed before giving out cached value'
  },
  {
    text: 'It is written in es6 using React and Redux. Uses mongo and ramda on the server to persist and process user data.'
  }
]

const footerText = 'my contacts: ... ';

export const HowItWorksPure = ({ playerOpened }) => <div className='how-it-works-page how-it-works-page_shifted'>
  <h1>{title}</h1>
</div> 

export const HowItWorks = connect(state => ({
  playerOpened: !!state.selectedEpisode
}))(HowItWorksPure)