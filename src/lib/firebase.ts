// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "bgmi-config-pro",
  "appId": "1:318946056014:web:c33e9d6c8123104bdd301f",
  "storageBucket": "bgmi-config-pro.firebasestorage.app",
  "apiKey": "AIzaSyAzOJV20yi-zBOD57WuTNTE4P003OG0Z8c",
  "authDomain": "bgmi-config-pro.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "318946056014"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
