import firebase from 'firebase/app';
import 'firebase/firestore';   // for cloud firestore

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAB0kOrRsWV9qSpAoXWJgm7cWldvKYlgFw",
    authDomain: "react-facebook-messenger-app.firebaseapp.com",
    databaseURL: "https://react-facebook-messenger-app.firebaseio.com",
    projectId: "react-facebook-messenger-app",
    storageBucket: "react-facebook-messenger-app.appspot.com",
    messagingSenderId: "122135747828",
    appId: "1:122135747828:web:04ca7c8613fcec956012a1",
    measurementId: "G-2SLHXN5N6P"
  });

const db=firebaseApp.firestore();
export default db;