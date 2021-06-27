import firebase from 'firebase';

//import firebase initialize data.
//You have to have your data
import firebaseObject from './config/firebase-conf'

firebase.initializeApp(firebaseObject);

const db = firebase.firestore();

export default db;