// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2C3oU0F_XlwAOgTjGKbPdQatMDoo2uQ0",
  authDomain: "blogging-app-cf000.firebaseapp.com",
  projectId: "blogging-app-cf000",
  storageBucket: "blogging-app-cf000.firebasestorage.app",
  messagingSenderId: "296561509167",
  appId: "1:296561509167:web:5eeca916a7928afa13d7da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
