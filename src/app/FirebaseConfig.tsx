// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABSTOC96xfWbAx84_p6n7Mktl7cJpIk6U",
  authDomain: "hotelfirstvilla-ba8f1.firebaseapp.com",
  projectId: "hotelfirstvilla-ba8f1",
  storageBucket: "hotelfirstvilla-ba8f1.appspot.com",
  messagingSenderId: "19367016058",
  appId: "1:19367016058:web:ea61a1b66ca00f4fd9adc3",
  measurementId: "G-BHNXT4JZSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage };