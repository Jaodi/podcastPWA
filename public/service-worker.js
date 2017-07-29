// fetching stratagies
const CACHE_FIRST = 'CACHE_FIRST';
const FETCH_FIRST = 'FETCH_FIRST';

// types of requests performed
const API_REQUEST = 'API_REQUEST';
const APP_SHELL = 'APP_SHELL';
const MEDIA_REQUEST = 'MEDIA_REQUEST';

// type to strategy map
const typeStrategy = {
  API_REQUEST: FETCH_FIRST,
  APP_SHELL: CACHE_FIRST,
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

const timedFetch = (timeout, url) => new Promise(resolve => {
  fetch(url).then(resolve);
  setTimeout(() => resolve({error: `timeout of ${timeout} exceeded`}), timeout);
})

const matchAndCache = (event, reqUrl) => 
  caches.match(event.request).then(cachedResp => 
    cachedResp || fetch(event.request).then(resp => 
      caches.open('1').then(cache => {
        cache.put(event.request, resp.clone());
        return resp;
      })
    )
  )


const executeStrategy = (strategy, event, reqUrl) => {
  switch (strategy){
    case CACHE_FIRST:
      return event.respondWith(matchAndCache(event, reqUrl));
    case FETCH_FIRST:
      return event.respondWith(timedFetch(3, reqUrl).then(resp => 
        resp.error ? matchAndCache(event, reqUrl) :
        caches.open('1').then(cache => {
          cache.put(reqUrl, resp.clone());
          return resp;
        })
      )
    )
  }
}

self.addEventListener('fetch', event => {
  const reqUrl = event.request.url;
  const strategy = typeStrategy[getResourceType(reqUrl)];

  return executeStrategy(strategy, event, reqUrl);
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

  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = 'favicon';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
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