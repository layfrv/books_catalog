import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCaEr_f3J48K2Ok2Tqlgw_CYOVzGyjWsNQ',
  authDomain: 'books-cde28.firebaseapp.com',
  databaseURL: 'https://books-cde28-default-rtdb.firebaseio.com',
  projectId: 'books-cde28',
  storageBucket: 'books-cde28.appspot.com',
  messagingSenderId: '106843602922',
  appId: '1:106843602922:web:9889ccf04c442184ccfc93',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
