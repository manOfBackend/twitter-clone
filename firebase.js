// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmg7q06aK1Fi2wgyki7r7ejOeemIcTYtE',
  authDomain: 'twitter-hj.firebaseapp.com',
  projectId: 'twitter-hj',
  storageBucket: 'twitter-hj.appspot.com',
  messagingSenderId: '146111707172',
  appId: '1:146111707172:web:88e802eb8e7973ec7b40b1',
  measurementId: 'G-FJ8KJ96XMP'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };