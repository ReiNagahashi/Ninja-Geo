// Import firebase 
import firebase from 'firebase'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCmnHNjUW0ZFD4fq_WmoJ-uDONVvU6ioAM",
    authDomain: "geo-ninja-b1859.firebaseapp.com",
    databaseURL: "https://geo-ninja-b1859.firebaseio.com",
    projectId: "geo-ninja-b1859",
    storageBucket: "geo-ninja-b1859.appspot.com",
    messagingSenderId: "538203279229",
    appId: "1:538203279229:web:084544d24eb69898a04614"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
