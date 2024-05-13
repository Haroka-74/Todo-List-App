import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB2vs3wTiDtYqSipsIVxCOzF-bku3AWYD4',
    authDomain: 'task6-ae273.firebaseapp.com',
    projectId: 'task6-ae273',
    storageBucket: 'task6-ae273.appspot.com',
    messagingSenderId: '522255147680',
    appId: '1:522255147680:web:99e0c8c877b3a69ab45fc5',
    measurementId: 'G-9BEES2R8WK'
};

// Initializing the firebase:
const app = initializeApp(firebaseConfig); // Search for the overloaded version of the 'initializeApp' function [ to make the firebase store in 'asyncStorage' automatically ].
const db = getFirestore(app);
const auth = getAuth(app);

export { app , db , auth };