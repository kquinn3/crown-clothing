import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDJELMarTDJaZsyJRzOw-B494u1U5JAfrc",
  authDomain: "crown-db-eef92.firebaseapp.com",
  databaseURL: "https://crown-db-eef92.firebaseio.com",
  projectId: "crown-db-eef92",
  storageBucket: "crown-db-eef92.appspot.com",
  messagingSenderId: "334800915526",
  appId: "1:334800915526:web:478426498555df356bce47",
  measurementId: "G-7XR036Q2F3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
