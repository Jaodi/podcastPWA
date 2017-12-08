import { fetchApi } from './utils/fetchApi';

let swRegistration;

export default function register() {
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        swRegistration = await navigator.serviceWorker.register(swUrl)
        // if push notifications are enabled update subscription endpoint on the server
        const subscription = await swRegistration.pushManager.getSubscription();
        await updateServerSubscription(subscription);
      }
      catch (error) {
        console.error('Error during service worker registration:', error);
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    swRegistration.unregister();
  }
}

export async function subscribe() {
  try {
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BEpKdtyAw9rTVeV4L74aWbDGPCrzCqDexT4OKYG4wtPbThBTTNypV4wlGBlHcvtqDS1thfqXSs7CXS5q-y5CXaI'),      
    });
    // TODO fix direct access to local storage
    await updateServerSubscription(subscription);
    return true;
  } catch (e) {  
    console.log(e);
    return false;
  }  
}

const updateServerSubscription = async (subscription) => {
  if (subscription) {
    await fetchApi('saveEndpoint', {
      subscription,
      userID: localStorage.userID
    })
  }
};

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}