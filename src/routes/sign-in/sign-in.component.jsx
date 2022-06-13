import React from 'react'
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../sign-up-form/sign-up-form.component'

const SignIn = () => {
 
    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup();
        const {user} = await signInWithGooglePopup(); //destructure response
        const userDocRef = await createUserDocumentFromAuth(user)
    }


  return (
      <div>
          <h1>SignIn</h1>
          <button onClick={logGoogleUser}>
              Sign in with Google Popup
          </button>
          <SignUpForm />
      </div>
      
  )
}

export default SignIn