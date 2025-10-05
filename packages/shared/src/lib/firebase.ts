/**
 * This module initializes and exports the Firebase app instance and its associated services.
 * It follows a singleton pattern to ensure that Firebase is only initialized once, which is
 * crucial in a Next.js environment with hot-reloading.
 *
 * Configuration is loaded robustly from environment variables, supporting either a single
 * JSON string or individual keys for flexibility.
 */

import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

/**
 * Loads the Firebase configuration from environment variables.
 * Returns null if configuration is incomplete or missing.
 * @returns {FirebaseOptions | null} The validated Firebase configuration object or null.
 */
function getFirebaseConfig(): FirebaseOptions | null {
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Check if all required fields are present
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof FirebaseOptions]);
  
  if (missingFields.length > 0) {
    console.warn(`Firebase configuration incomplete. Missing: ${missingFields.join(', ')}`);
    return null;
  }

  return firebaseConfig;
}

const firebaseConfig = getFirebaseConfig();

// Initialize Firebase App only if configuration is available
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

if (firebaseConfig) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
}

// Export the instances to be used throughout the application
export { app, db, auth, storage };
