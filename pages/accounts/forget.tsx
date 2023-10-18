import ForgetPassword from "@/components/features/accounts/ForgetPassword";
import { NextPage } from "next";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface FormFields {
    email: string;
}

const ForgetPasswordPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        setIsLoading(true);
        const { email } = data;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                console.log("email sent");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setIsLoading(false);
            });
    };

    const onError: SubmitErrorHandler<FormFields> = (error) => {
        const errors = Object.values(error).map(
            (item) => item.message
        ) as string[];
        toast.error(errors?.[0]);
        setIsLoading(false);
    };

    return (
        <ForgetPassword
            onSubmit={onSubmit}
            onError={onError}
            isLoading={isLoading}
        />
    );
};

export default ForgetPasswordPage;
