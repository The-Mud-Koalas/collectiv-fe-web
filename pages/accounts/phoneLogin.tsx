"use client";
import AccountNavbar from "@/components/features/accounts/AccountNavbar";
import PhoneLogin from "@/components/features/accounts/PhoneLogin";
import OTPpopup from "@/components/features/accounts/PhoneLogin/OTPpopup";
import { auth } from "@/config/firebase";
import { formatFirebaseAuthErrorMessage } from "@/utils/helpers/formatting/formatFirebaseAuthErrorMessage";
import { FirebaseError } from "firebase/app";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
    FieldError,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const phoneLoginPage: NextPage = () => {
    const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const form = useForm<PhoneLoginFormFields>();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response: string | null) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    if (response) {
                        // reCAPTCHA solved, allow signInWithPhoneNumber
                        //onSignInSubmit();
                        console.log(response);
                        form.reset();

                        // Call your function to handle sign-in here
                    } else {
                        console.log("reCAPTCHA challenge not completed.");
                    }
                },
            }
        ); // Add a <div> with id 'recaptcha-container' in your HTML
    }, []);

    const onSubmit: SubmitHandler<PhoneLoginFormFields> = async (data) => {
        setIsLoading(true);
        const { phoneNumber } = data;
        console.log(phoneNumber);
        setPhoneNumber(phoneNumber);
        signIn(phoneNumber);
    };

    const signIn = async (phoneNumber: string) => {
        const appVerifier = window.recaptchaVerifier;
        try {
            // If the input contains '@', treat it as an email
            await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    console.log("Login success", confirmationResult);
                    setShowOTPModal(true);
                    window.confirmationResult = confirmationResult;
                })
                .catch((error) => {
                    // Handle error
                    console.error("Verification code sending error:", error);
                });
            form.reset();
        } catch (error) {
            console.log("test");
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
        const errors = Object.values(error).map(
            (item) => item.message
        ) as string[];
        toast.error(errors?.[0]);
    };

    const handleOTPChange = (newOTP: string[]) => {
        let otp = newOTP.join("");

        if (otp.length === 6) {
            console.log("code full");
            // verifu otp
            let confirmationResult = window.confirmationResult;
            confirmationResult
                .confirm(otp)
                .then((result: any) => {
                    // User signed in successfully.
                    let user = result.user;
                    console.log(user);
                    alert("User signed in successfully");
                    setShowOTPModal(false);
                    // ...
                })
                .catch((error: any) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                    console.error("Error verifying code:", error);
                });
        }
    };

    return (
        <>
            <AccountNavbar />
            <div className="flex h-screen justify-center items-center">
                {showOTPModal === true ? (
                    <OTPpopup
                        phoneNumber={phoneNumber}
                        handleOTPChange={handleOTPChange}
                    />
                ) : (
                    <PhoneLogin
                        form={form}
                        isLoading={isLoading}
                        onError={onError}
                        onSubmit={onSubmit}
                    />
                )}

                <div id="recaptcha-container"></div>
            </div>
        </>
    );
};

export default phoneLoginPage;
