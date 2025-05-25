// firebase.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyANaCIGE65ek04vTpHcaFk39ghW4YVFSA0',
  authDomain: 'login-f243e.firebaseapp.com',
  projectId: 'login-f243e',
  storageBucket: 'login-f243e.appspot.com',
  messagingSenderId: '929262282985',
  appId: '1:929262282985:web:bb117a23ffdc287b76a878',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {
  auth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
};
