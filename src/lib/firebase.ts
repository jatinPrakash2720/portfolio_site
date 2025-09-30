import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}',
)

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }
