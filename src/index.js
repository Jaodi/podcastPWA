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

const store = createStore(
  podcastApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// store.dispatch(openPodcast(parsedPodcast));

ReactDOM.render(  
  <BrowserRouter>
    <Provider
      store={store}
    >
      <div>
        <Switch>
          <Route exact path='/'>   
            <App />
          </Route>
          <Route path='/podcast'>   
            <PodcastPage />
          </Route>
        </Switch>        
        <ConnectedPodcastPlayer />   
      </div>
    </Provider>
  </BrowserRouter>   
, document.getElementById('root'));
registerServiceWorker();
