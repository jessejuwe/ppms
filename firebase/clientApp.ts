// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB4s0rxDAKN6JCcZJH4PmWrxK1Gd1a4ucg',
  authDomain: 'ppms-af3c8.firebaseapp.com',
  databaseURL: 'https://ppms-af3c8-default-rtdb.firebaseio.com',
  projectId: 'ppms-af3c8',
  storageBucket: 'ppms-af3c8.appspot.com',
  messagingSenderId: '437885695348',
  appId: '1:437885695348:web:3b83dbac05e48e3a856821',
  measurementId: 'G-YCX96GTV7L',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Create a firestore instance
export const firestore = getFirestore(app);

// Create an authentication instance
export const auth = getAuth(app);

// Reference to specific collection (user) in firestore database
export const userCollection = collection(firestore, 'users');
