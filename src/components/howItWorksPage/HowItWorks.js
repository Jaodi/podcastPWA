import React from 'react';
import { connect } from 'react-redux';
import './HowItWorks.css';

const content = [
  {
    text: 'It works offline on newer browsers, because it caches both itself and the podcast`s audio you playback.'
  },
  {
    text: 'Moreover, it loads new episodes of the podcasts you subscribe to, whenever they come out.'
  },
  {
    text: 'It can be saved to homescreen and used without browser navigation to mimmick the look and feel of a native app.'
  }
]

const subscriptions = [
  {
    text: 'Subscribing to a podcast is extremely simple. No registration needed. You just need to give the permission for this site to send notifications once.'
  },
  {
    text: 'PodcastPWA is completely functional without a single subscription. You dont have to do anything to get the benefit of fully cached app.'
  }
]

const addingPodcasts = [
  {
    text: 'Adding a new podcast is rather simple. The only thing needed is a link to podcast`s rss-feed. Upon submiting a new link you will be redirected to a page with audio player.'
  }
]

// const underTheHood = [
//   {
//     text: 'This web application extensively uses service-worker capabilities. It has two distinct caching strategies: agressivly cache app shell and media content, while always giving an attempt at loading the newest podcast feed before giving out cached value'
//   },
//   {
//     text: 'It is written in es6 using React and Redux. Uses mongo and ramda on the server to persist and process user data.'
//   }
// ]

const footerText = 'my contacts: ... ';

const SiteFeature = ({text}) => <span className='how-it-works-page__site-feature'>
  {text}
</span>

export const HowItWorksPure = ({ playerOpened }) => <div 
  className={`how-it-works-page${playerOpened ? ' how-it-works-page_shifted' : ''}`}>
  <h1 className='how-it-works-page__title'>How this site works</h1>
  {content.map((el, ind) => 
    <SiteFeature text={el.text} key={ind}/>
  )}
  <h1 className='how-it-works-page__title'>Adding podcasts</h1>
  {addingPodcasts.map((el, ind) => 
    <SiteFeature text={el.text} key={ind}/>
  )}
  <h1 className='how-it-works-page__title'>Subscriptions</h1>
  {subscriptions.map((el, ind) => 
    <SiteFeature text={el.text} key={ind}/>
  )}
</div> 

export const HowItWorks = connect(state => ({
  playerOpened: !!state.selectedEpisode
}))(HowItWorksPure)