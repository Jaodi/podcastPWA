import { fetchApi } from './utils/fetchApi';

export default function register() {
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {

      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      const registration = await navigator.serviceWorker.register(swUrl)
      registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and
                // the fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in your web app.
                console.log('New content is available; please refresh.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
      }
      catch (error) {
        console.error('Error during service worker registration:', error);
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

export async function subscribe() {
  if (Notification.permission === 'granted') {
    return true;
  }
  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true });
    // TODO fix direct access to local storage
    const serverResponse =  await fetchApi('/saveEndpoint', {
      endpoint: subscription.endpoint,
      userID: localStorage.userID
    });
    console.log(serverResponse);
    return true;
  } catch (e) {  
    return false;
  }  
}