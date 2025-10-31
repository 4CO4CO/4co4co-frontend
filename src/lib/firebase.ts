import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOz5rSi86hJvzNTL3oSJ0xnmFzASSHHro',
  authDomain: 'co4co-7033a.firebaseapp.com',
  projectId: 'co4co-7033a',
  storageBucket: 'co4co-7033a.firebasestorage.app',
  messagingSenderId: '27188200804',
  appId: '1:27188200804:web:d25570734599ac8a412671',
  measurementId: 'G-0XSMM011KB',
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
