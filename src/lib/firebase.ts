'use server';
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
}

// Validate environment variables
for (const key in firebaseConfig) {
  if (firebaseConfig[key as keyof FirebaseOptions] === undefined) {
    const envVarName = `NEXT_PUBLIC_FIREBASE_${toSnakeCase(key)}`;
    throw new Error(`Missing Firebase config key: ${key}. Please set the corresponding ${envVarName} environment variable in your Vercel project settings.`);
  }
}

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
