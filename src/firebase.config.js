import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBSYWH9AriKgPNkoPIQTsFVN1Rif22kDfk",
	authDomain: "form-builder-a5e33.firebaseapp.com",
	databaseURL: "https://form-builder-a5e33.firebaseio.com",
	projectId: "form-builder-a5e33",
	storageBucket: "form-builder-a5e33.appspot.com",
	messagingSenderId: "1012723561102",
	appId: "1:1012723561102:web:2c282935c41826f7684fdf",
};

firebase.initializeApp(firebaseConfig);
export const formFirestore = firebase.firestore();
