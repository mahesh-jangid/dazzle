import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKFdVjjzrcsoOZLE1MsxIBMuwhcmdwTR0",
    authDomain: "dazzle-b7f71.firebaseapp.com",
    projectId: "dazzle-b7f71",
    storageBucket: "dazzle-b7f71.appspot.com",
    messagingSenderId: "248715709527",
    appId: "1:248715709527:web:3afff2801dff74b276e712",
    measurementId: "G-VNC5J8GXYK"};

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    
    export { firestore };