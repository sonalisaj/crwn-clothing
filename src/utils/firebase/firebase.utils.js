import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithRedirect,
    signInWithPopup, GoogleAuthProvider
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log("\n-------userDocRef-------", userDocRef)

    const userSnapShot = await getDoc(userDocRef);
    // console.log("\n-----userSnapShot-----", userSnapShot)
    console.log("\n-----userSnapShot exists-----", userSnapShot.exists())

    //if userSnapShot doesn't exist
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('Error creating the user', error.message)
        }
    }

    //if userSnapShot exists (user data exists)

    return userDocRef;

}


