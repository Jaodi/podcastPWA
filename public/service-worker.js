const cacheVersion = '2';

// fetching stratagies
const CACHE_FIRST = 'CACHE_FIRST';
const CACHE_FIRST_VERSIONED = 'CACHE_FIRST_VERSIONED';
const FETCH_FIRST = 'FETCH_FIRST';

// types of requests performed
const API_REQUEST = 'API_REQUEST';
const APP_SHELL = 'APP_SHELL';
const MEDIA_REQUEST = 'MEDIA_REQUEST';

// type to strategy map
const typeStrategy = {
  API_REQUEST: FETCH_FIRST,
  APP_SHELL: CACHE_FIRST_VERSIONED,
  MEDIA_REQUEST: CACHE_FIRST
}

// types of rules for checks whether request belongs to a type
const STARTS_WITH = 'STARTS_WITH';
const EQUAL_TO = 'EQUAL_TO';

// rules themselves
const appShell = [
  {pattern: '/podcast', type: STARTS_WITH},
  {pattern: '/', type: EQUAL_TO},
  {pattern: '/podcasts', type: EQUAL_TO},
  {pattern: '/static/js/bundle.js', type: EQUAL_TO},
  {pattern: '/static/js/main', type: STARTS_WITH},
  {pattern: '/static/css/main', type: STARTS_WITH},
];

const getResourceType = url => {
  if (url.startsWith(self.origin)) {
    const method = url.slice(self.origin.length)

    // appShell rules
    for (const rule of appShell) {
      const { type, pattern } = rule;

      switch (type){
        case EQUAL_TO:
          if (method === pattern) return APP_SHELL; 
          break;
        case STARTS_WITH:
          if (method.startsWith(pattern)) return APP_SHELL;
          break;
        default:
      }
    }
    // "same origin and not in the appShell" is an api request
    return API_REQUEST;
  }
  // "different origin" is a media request 
  return MEDIA_REQUEST;
}

const timedFetch = (timeout, request) => new Promise(resolve => {
  fetch(request).then(resolve);
  setTimeout(() => resolve({error: `timeout of ${timeout} exceeded`}), timeout);
})

const matchAndCache = (request, version = '1') => 
caches.open(version).then(cache => cache.match(request).then(cachedResp => 
  cachedResp || cache.match(request.url).then(cachedResp => 
    cachedResp || fetch(request).then(resp => {
      cache.put(request, resp.clone());
      return resp;
    })
  )
))

const executeStrategy = (strategy, event, request) => {
  const reqUrl = request.url;
  switch (strategy){
    case CACHE_FIRST:
      return event.respondWith(matchAndCache(request));
    case CACHE_FIRST_VERSIONED:
      return event.respondWith(matchAndCache(request, cacheVersion));
    case FETCH_FIRST: {
      const copy = request.clone();
      return event.respondWith(timedFetch(500, request).then(resp => {
        return resp.error ? matchAndCache(copy) :
        caches.open('1').then(cache => {
          cache.put(copy, resp.clone());
          return resp;
        })
      }))
    }
  }
}

self.addEventListener('fetch', event => {
  const reqUrl = event.request.url;
  const strategy = typeStrategy[getResourceType(reqUrl)];

  return event.request.type === 'GET' 
    ? executeStrategy(strategy, event, event.request) 
    : fetch(event.request);
});

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.

      windowClient.navigate(windowClient.url);
    }
  });
  self.caches.keys().then(keyList => {
    for (const key of keyList) {
      caches.delete(key);
    }
  })
});

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
  var icon = 'favicon';

  event.waitUntil( 
    dbPromise.
    then(userID => fetch(`/api/getLastEpisode?userID=${userID}`).then(res => res.json()).then(lastEpisode => {
      self.registration.showNotification(`${lastEpisode.podcastTitle}`, {  
        body: `${lastEpisode.title}`,  
        icon: icon,  
        tag: lastEpisode.podcastID  
      });
      // start loading episode.enclosure.url      
      return matchAndCache(new Request(lastEpisode.enclosure.url, {mode: 'no-cors'}));
    })   
  ));  
});

self.addEventListener('notificationclick', function(event) {  
  const url = `/podcast/${event.notification.tag}`;

  console.log('On notification click: ', event.notification.tag);    
  event.notification.close();

  // This looks to see if the current is already open and  
  // focuses if it is  
  event.waitUntil(
    clients.matchAll({  
      type: "window"  
    })
    .then(function(clientList) {  
      for (var i = 0; i < clientList.length; i++) {  
        var client = clientList[i];  
        if (client.url == url && 'focus' in client)  
          return client.focus();  
      }  
      if (clients.openWindow) {
        return clients.openWindow(url);  
      }
    })
  );
});

const dbPromise = new Promise((resolve, reject) => {
  const open = indexedDB.open('db', 1);
  open.onupgradeneeded = e => {
    open.result.createObjectStore('s');
  };
  open.onsuccess = e => {
    const s = open.result.transaction('s').objectStore('s');
    const rq = s.get('userID');
    rq.onsuccess = (e => e.target.result ? resolve(e.target.result) : reject(new Error('no userID')));
    // rq.onerror(reject);
  };
})
