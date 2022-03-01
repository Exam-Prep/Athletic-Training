/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDNo3OIlcsgsZkV1gPacS0lZW7UQZuIe14",
	authDomain: "athletitrain.firebaseapp.com",
	projectId: "athletitrain",
	storageBucket: "athletitrain.appspot.com",
	messagingSenderId: "99644510408",
	appId: "1:99644510408:web:e969d81d936569a06715fd",
	measurementId: "G-GTC6K15JY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
