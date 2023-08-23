import { PasswordField, TextInputField } from "@/components/shared/forms";
import React from "react";
import { FieldError, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

interface FormFields {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormFields>();

  const submitLogin: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password": {
            toast.error("Your password is incorrect.");
            break;
          }
          case "auth/user-not-found": {
            toast.error("This user does not exist.");
            break;
          }
          default : {
            toast.error("An error has occured.");
            break;
          }
        }
      }

      toast.error("An error has occured.");
    }
  };

  const onError: SubmitErrorHandler<FieldError> = (error) => {
    const errors = Object.values(error).map(item => item.message) as string[] ;
    toast.error(errors?.[0]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitLogin, onError)}>
        <TextInputField label="Email" field="email" register={register} registerOptions={{
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "The email inputted is invalid"
          }
        }}/>
        <PasswordField label="Password" field="password" register={register} registerOptions={{
          validate: {
            isNumeric: (v: string) => !isNaN(Number(v)) || "Your passcode should be numeric.",
            isLengthSix: (v: string) => v.length === 6 || "Your passcode should have a length of 6."
          }
        }}/>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
