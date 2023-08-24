import Login from '@/components/features/accounts/Login'
import { auth } from '@/config/firebase'
import { formatFirebaseAuthErrorMessage } from '@/utils/helpers/formatting/formatFirebaseAuthErrorMessage'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import { FieldError, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      console.log("test")
      const user = await signInWithEmailAndPassword(auth, email, password);
      form.reset();
      console.log(user);
    } catch (error) {
      console.log("test")
      if (error instanceof FirebaseError) {
        const errorMessage = formatFirebaseAuthErrorMessage(error);
        toast.error(errorMessage);
        return;
      }

      toast.error("An error has occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<FieldError> = (error) => {
    const errors = Object.values(error).map((item) => item.message) as string[];
    toast.error(errors?.[0]);
  };
  
  return (
    <div><Login form={form} isLoading={isLoading} onError={onError} onSubmit={onSubmit}/></div>
  )
}

export default LoginPage