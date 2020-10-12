import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // sonny data
  // apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
  // authDomain: "instagram-clone-23884.firebaseapp.com",
  // databaseURL: "https://instagram-clone-23884.firebaseio.com",
  // projectId: "instagram-clone-23884",
  // storageBucket: "instagram-clone-23884.appspot.com",
  // messagingSenderId: "671034896143",
  // appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
    apiKey: "AIzaSyCQkJ3v2JHrC0W-7deJP1tVpMb8LFpskGY",
    authDomain: "instagram-with-react-30fa4.firebaseapp.com",
    databaseURL: "https://instagram-with-react-30fa4.firebaseio.com",
    projectId: "instagram-with-react-30fa4",
    storageBucket: "instagram-with-react-30fa4.appspot.com",
    messagingSenderId: "816384839312",
    appId: "1:816384839312:web:e972f196e4c55f65c0d215",
    measurementId: "G-QYXLGZJ8J9"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
