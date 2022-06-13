import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithRedirect,
    signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore, //to instantiate firestor
    doc, //to retrive documents from inside of our firestore db
    getDoc, //to get doc
    setDoc, //to set doc
    Firestore
} from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf70E2TFfzVjlGfoEtICnvjqJ5P7AhnIg",
  authDomain: "crwn-clothing-db-b0563.firebaseapp.com",
  projectId: "crwn-clothing-db-b0563",
  storageBucket: "crwn-clothing-db-b0563.appspot.com",
  messagingSenderId: "990085724618",
  appId: "1:990085724618:web:0100dd147ffd02158b3733"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log("\n-------userDocRef-------", userDocRef)

    const userSnapShot = await getDoc(userDocRef);
    // console.log("\n-----userSnapShot-----", userSnapShot)
    // console.log("\n-----userSnapShot exists-----", userSnapShot.exists())

    //if userSnapShot doesn't exist
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error creating the user', error.message)
        }
    }

    //if userSnapShot exists (user data exists)

    return userDocRef;

}



export const createAuthUserWithEmailAndPassword = async (email, password) => {
    console.log("\n----signup email----", email)
    console.log("\n----signup password----", password)
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    console.log("\n----email----", email)
    console.log("\n----password----", password)
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};