import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Try to get config from NEXT_PUBLIC_FIREBASE_CONFIG first, fallback to individual env vars
let firebaseConfig: any

if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
  try {
    firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  } catch (error) {
    console.warn(
      'Failed to parse NEXT_PUBLIC_FIREBASE_CONFIG, falling back to individual env vars',
    )
  }
}

// Fallback to individual environment variables
if (!firebaseConfig || !firebaseConfig.projectId) {
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID, // You may need to add this to your env vars
  }
}

// Validate required fields
if (!firebaseConfig.projectId) {
  console.error(
    'Firebase configuration is missing. Please check your environment variables.',
  )
  // Create a mock config to prevent crashes
  firebaseConfig = {
    apiKey: 'demo-api-key',
    authDomain: 'demo-project.firebaseapp.com',
    projectId: 'demo-project',
    storageBucket: 'demo-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'demo-app-id',
  }
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }
