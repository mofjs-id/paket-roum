import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/messaging";

import config from "../../firebase.json";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const messaging = firebase.messaging();
export default firebase;
