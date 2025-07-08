import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAttCESYNOxAdshSvDENtYY_Zp1cfhgDUw",
  authDomain: "calculatorbear-29a76.firebaseapp.com",
  projectId: "calculatorbear-29a76",
  storageBucket: "calculatorbear-29a76.appspot.com",
  messagingSenderId: "407349466415",
  appId: "1:407349466415:web:436cbde68e223ea031bdda",
  measurementId: "G-DL7D2FBLGL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
