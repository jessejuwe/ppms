// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import process from 'process';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firestore and get a reference to the service
export const firestore = getFirestore(app);

// Initialize Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Create a storage reference
export const storageRef = ref(storage);

// Reference to specific collection (user) in firestore database
export const userCollection = collection(firestore, 'users');

// Reference to specific collection (candidate_reg) in firestore database
export const candidateRegistrationCollection = collection(
  firestore,
  'candidate_registration'
);

// Reference to specific collection (candidate_reg) in firestore database
export const programExecutionCollection = collection(
  firestore,
  'program_execution'
);

// Reference to specific collection (candidate_reg) in firestore database
export const studentRegistrationCollection = collection(
  firestore,
  'student_registration'
);

// Reference to specific collection (candidate_reg) in firestore database
export const incidentReportingCollection = collection(
  firestore,
  'incident_reporting'
);

// Reference to specific collection (candidate_reg) in firestore database
export const projectEnlistmentCollection = collection(
  firestore,
  'project_enlistment'
);

// Reference to specific collection (candidate_reg) in firestore database
export const itemEnlistmentCollection = collection(
  firestore,
  'item_enlistment'
);
