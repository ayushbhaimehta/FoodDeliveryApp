import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_1ytvywjY2pEHqoXwoE8n8Dllq4FbLeI",
    authDomain: "food-delivery-app-2a7d6.firebaseapp.com",
    projectId: "food-delivery-app-2a7d6",
    storageBucket: "food-delivery-app-2a7d6.appspot.com",
    messagingSenderId: "780460721574",
    appId: "1:780460721574:web:d1010846a6f20acdbfbb67"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
// Use these for db & auth
const db = firebaseApp.firestore();

export { firebase, db, storage };