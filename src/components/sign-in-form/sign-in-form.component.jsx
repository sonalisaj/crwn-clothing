import React, { useState } from 'react'
import {
    signInWithGooglePopup,
  createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
const defaultFormFields = {
    email: '',
    password: '',
 }

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log("\n---formFiels---", formFields);

   const signInWithGoogle = async () => {
        // const response = await signInWithGooglePopup();
        const {user} = await signInWithGooglePopup(); //destructure response
        await createUserDocumentFromAuth(user)
    }
  
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

   const handleSubmit = async (event) => {
    event.preventDefault();

     try {
       const response = await signInAuthUserWithEmailAndPassword(email, password);
       console.log(response);
      resetFormFields();
     } catch (error) {
       switch (error.code) {
         case 'auth/wrong-password':
           alert('Incorrect password for email');
           break;
         
         case 'auth/user-not-found':
           alert('No user associated with this email')
           break;
         
         default:
           console.log(error);
       }
    }
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }

  return (
      <div className='sign-up-container'>
        <h2>Already have an Account?</h2>
        <span>SignIn with your email & password</span>
        <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
   
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType='google'
            onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
        
        </form>
    </div>
  )
}

export default SignInForm

