import Login from "@/components/features/accounts/Login";
import { auth } from "@/lib/firebase";
import { loginWithEmail } from "@/utils/fetchers/authentication";
import { formatFirebaseAuthErrorMessage } from "@/utils/helpers/formatting/formatFirebaseAuthErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";
import { showErrorToast } from "@/lib/toast";
import { Template } from "@/components/shared/layouts";

const LoginPage: NextPage = () => {
  const { sendMessageToRN } = useAppContext();
  const form = useForm<LoginFormFields>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (user) => {
      form.reset();
      sendMessageToRN({ type: "auth-token", token: user.user.refreshToken });
      const next = searchParams.get("next");
      router.push(next ?? "/");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        const errorMessage = formatFirebaseAuthErrorMessage(error);
        return;
      }

      console.log("An error occured.");
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      mutateAsync(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = formatFirebaseAuthErrorMessage(error);
        toast.error(errorMessage)
        return;
      }
      const err = error as Error;
      toast.error(err.cause as string);
    }
  };

  const onError: SubmitErrorHandler<FieldError> = (error) => {
    const errors = Object.values(error).map((item) => item.message) as string[];
    toast.error(errors?.[0]);
  };

  return (
    <Template>
      <Login
        form={form}
        isLoading={isLoading}
        onError={onError}
        onSubmit={onSubmit}
      />
    </Template>
  );
};

export default LoginPage;
