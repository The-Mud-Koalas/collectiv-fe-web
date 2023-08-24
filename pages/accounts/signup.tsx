import Signup from "@/components/features/accounts/Signup";
import { auth } from "@/config/firebase";
import { formatFirebaseAuthErrorMessage } from "@/utils/helpers/formatting/formatFirebaseAuthErrorMessage";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import React, { useState } from "react";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

const SignupPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignupFormFields>();

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    const { email, name, password } = data;
    try {
      setIsLoading(true);
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      form.reset();
      toast.success("User successfully created.");
    } catch (error) {
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
    console.log(error);
  };

  return (
    <Signup
      form={form}
      isLoading={isLoading}
      onError={onError}
      onSubmit={onSubmit}
    />
  );
};

export default SignupPage;
