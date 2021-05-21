import { Notification as Toast } from 'rsuite';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyDL-Uwb-vhNuf_TTT3h7jFiGTExBZlQwh0',
  authDomain: 'chat-web-app-73dd5.firebaseapp.com',
  databaseURL: 'https://chat-web-app-73dd5-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-73dd5',
  storageBucket: 'chat-web-app-73dd5.appspot.com',
  messagingSenderId: '627225084584',
  appId: '1:627225084584:web:0b63f6912a7fe05842f89d',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west3');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BLs_I-HQyrAuUJJh8H3U0vtHGhVhXLMqoVoomeNL90GMKm0-o7sSoN9CJYRiBAVz-Yi7ZAni8mKateJfDwodTnw'
  );

  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useFunctionsEmulator('http://localhost:5001');
}
