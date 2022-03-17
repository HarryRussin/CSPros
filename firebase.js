// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHPf1a1MBcIz80KJOrDn2ClH1w6azJeH4",
    authDomain: "cspros-c81ca.firebaseapp.com",
    projectId: "cspros-c81ca",
    storageBucket: "cspros-c81ca.appspot.com",
    messagingSenderId: "244302260410",
    appId: "1:244302260410:web:b12989d50cbcd05fe27a83",
    measurementId: "G-L3V9336BWQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app,storage,db}