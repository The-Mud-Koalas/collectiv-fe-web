import Signup from "@/components/features/accounts/Signup";
import { auth } from "@/lib/firebase";
import { signUpWithEmail } from "@/utils/fetchers/authentication";
import { formatFirebaseAuthErrorMessage } from "@/utils/helpers/formatting/formatFirebaseAuthErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: (data) => {
      form.reset();
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const errorMessage = formatFirebaseAuthErrorMessage(error);
        console.log(errorMessage);
        return;
      }

      console.log("An error has occured.");
    },
  });
  const form = useForm<SignupFormFields>();

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      mutateAsync(data);
    } catch (error) {
      const err = error as Error;
      toast.error(err.cause as string);
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
