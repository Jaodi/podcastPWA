import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { podcastApp } from './reducers/podcastApp'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { PodcastPage } from './components/PodcastView'; 
import { ConnectedPodcastPlayer } from './components/PodcastPlayer'; 
import { openPodcast } from './actions/index';
import { parsedPodcast } from './server/mockData/podcastRss';
// import { activePodcast, selectedEpisode, displayedEpisodes, initPodcast } from './uiState'; 

const store = createStore(
  podcastApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.dispatch(openPodcast(parsedPodcast));
// initPodcast(parsedPodcast);
// const { description, link, title, icon } = activePodcast;

ReactDOM.render(  
  <BrowserRouter>
    <Provider
      store={store}
    >
      <div>
        <ConnectedPodcastPlayer />   
        <Switch>
          <Route exact path='/'>   
            <App />
          </Route>
          <Route path='/podcast'>   
            <PodcastPage />
          </Route>
        </Switch>        
      </div>
    </Provider>
  </BrowserRouter>   
, document.getElementById('root'));
registerServiceWorker();
