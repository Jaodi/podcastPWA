import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import App from './App';
import { podcastApp } from './reducers/podcastApp'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { PodcastPage } from './components/podcastPage/PodcastPage'; 
import { PreviewsPage } from './components/previewsPage/PreviewsPage'; 
import { HowItWorks } from './components/howItWorksPage/HowItWorks'; 
import { ConnectedPodcastPlayer } from './components/PodcastPlayer';
import { getUserID } from './utils/getUserID';
import { setUserID } from './actions';

const store = createStore(
  podcastApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const dbPromise = userID => new Promise((resolve, reject) => {
  const open = indexedDB.open('db', 1);
  open.onupgradeneeded = e => {
    open.result.createObjectStore('s');
  };
  open.onsuccess = e => {
    const s = open.result.transaction('s', 'readwrite').objectStore('s');
    const rq = s.put(userID, 'userID');
    resolve();
    // rq.onsuccess(resolve);
    // rq.onerror(reject);
  };
})

getUserID().then(id => {
  store.dispatch(setUserID(id));
  return dbPromise(id);
});

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
          <Route path='/howItWorks' component={HowItWorks} />
        </Switch>        
        <ConnectedPodcastPlayer />   
      </div>
    </Provider>
  </BrowserRouter>   
, document.getElementById('root'));
registerServiceWorker();
