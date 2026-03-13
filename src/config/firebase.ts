import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDqOF39hgHmcGGZAc4c-mXGOWEMLZ0WAKE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gdp-grow-prediction-model.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gdp-grow-prediction-model",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gdp-grow-prediction-model.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "208179229459",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:208179229459:web:fac142fde5119a732860e6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CJP3KTJNVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (optional - only in production)
let analytics;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

export { analytics };
