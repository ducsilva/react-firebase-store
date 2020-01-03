import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = { timestampsInSnapshots: true };


var config = {
  apiKey: "AIzaSyDsdpJkwd1lKBQ1pHKfkiHTI3Lw0WT-CdI",
  authDomain: "react-crud-72383.firebaseapp.com",
  databaseURL: "https://react-crud-72383.firebaseio.com",
  projectId: "react-crud-72383",
  storageBucket: "react-crud-72383.appspot.com",
  messagingSenderId: "876441448920",
  appId: "1:876441448920:web:8305752417c71249c582ad",
  measurementId: "G-2BDHNZH6TS"
};
// Initialize Firebase
firebase.initializeApp(config);
  // firebase.analytics();
firebase.firestore().settings(settings);

export default firebase;