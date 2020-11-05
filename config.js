
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB0E8Zsa2koPHjUPd3xPbaLZYLxCSn6vRI",
    authDomain: "text-test-c14b9.firebaseapp.com",
    databaseURL: "https://text-test-c14b9.firebaseio.com",
    projectId: "text-test-c14b9",
    storageBucket: "text-test-c14b9.appspot.com",
    messagingSenderId: "242590839259",
    appId: "1:242590839259:web:2ba6c7ae562d0e44b737fe",
    measurementId: "G-35M2S36PN8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();
