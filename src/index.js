import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { podcastApp } from './reducers/podcastApp'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { PodcastPage } from './components/podcastPage/PodcastPage'; 
import { PreviewsPage } from './components/previewsPage/PreviewsPage'; 
import { ConnectedPodcastPlayer } from './components/PodcastPlayer';

const store = createStore(
  podcastApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
// store.dispatch(openPodcast(parsedPodcast));

ReactDOM.render(  
  <BrowserRouter>
    <Provider
      store={store}
    >
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route exact path='/podcasts' component={PreviewsPage} />
          <Route path='/podcast/:id?' component={PodcastPage} /> 
        </Switch>        
        <ConnectedPodcastPlayer />   
      </div>
    </Provider>
  </BrowserRouter>   
, document.getElementById('root'));
registerServiceWorker();
