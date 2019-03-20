import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

import config from "./firebase-config.json";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const messaging = firebase.messaging();
export default firebase;
