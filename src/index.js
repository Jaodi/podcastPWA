import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PodcastView } from './components/PodcastView'; 

ReactDOM.render(  
  <BrowserRouter>   
    <Switch>
      <Route exact path='/'>   
        <App />
      </Route>
      <Route path='/podcast'>   
        <PodcastView
          title='js jabber'
        />
      </Route>
    </Switch>  
  </BrowserRouter>   
, document.getElementById('root'));
registerServiceWorker();
