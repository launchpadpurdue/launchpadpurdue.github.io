import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADK7aEUqe35K3B-gyjXDfdFDEOf-xSZ-U",
  authDomain: "website-leaderboard-b0caf.firebaseapp.com",
  projectId: "website-leaderboard-b0caf",
  storageBucket: "website-leaderboard-b0caf.firebasestorage.app",
  messagingSenderId: "468159190454",
  appId: "1:468159190454:web:e3d48e24f7627aa0701d17",
  measurementId: "G-5Z6Z1P5BRQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;