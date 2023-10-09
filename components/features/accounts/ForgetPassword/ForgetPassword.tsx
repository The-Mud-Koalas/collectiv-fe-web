import React from "react";
import AccountNavbar from "../AccountNavbar";
import { COLORS } from "@/utils/constants/colors";
import Link from "next/link";
import {
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
    FieldError,
} from "react-hook-form";
import { TextInputField } from "@/components/shared/forms";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { Button } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import { Back } from "@/components/shared/svg/icons";
import { FC } from "react";
import { ClipLoader } from "react-spinners";

interface FormFields {
    email: string;
}

interface Props {
    onSubmit: SubmitHandler<FormFields>;
    onError: SubmitErrorHandler<FieldError>;
    isLoading: boolean;
}

const ForgetPassword: FC<Props> = ({ onSubmit, onError, isLoading }) => {
    const { handleSubmit, register } = useForm<FormFields>();

    return (
        <>
            <div className="flex flex-col h-screen">
                <AccountNavbar />
                <div className="flex justify-center items-center flex-grow">
                    {/*grid place-items-center */}
                    <div
                        className={`flex flex-col px-5 py-8 gap-6 ${inter.className} md:py-[5%] max-w-xl w-full`}
                    >
                        <div className="flex flex-col gap-2">
                            <Link href="/accounts/login" className="mb-5">
                                <Back
                                    dimensions={{ width: 32 }}
                                    color={COLORS.primary[700]}
                                />
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-semibold">
                                Forgot Password
                            </h1>
                            <p className="text-sm md:text-base font-small">
                                Enter the phone number or email you used when
                                you joined and we’ll send you{" "}
                                <span className="bg-pink-200">
                                    &nbsp;link to reset your password.
                                </span>
                            </p>
                        </div>

                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <TextInputField
                                field="email"
                                label="Email / Phone Number"
                                register={register}
                                registerOptions={{
                                    pattern: {
                                        value: EMAIL_REGEX,
                                        message:
                                            "The email you entered is invalid",
                                    },
                                }}
                                placeholder="Email"
                            />
                            <Button
                                disabled={isLoading}
                                className="bg-primary-700 flex justify-center items-center p-3 rounded-lg"
                            >
                                <ClipLoader
                                    // className="py-3"
                                    color="#BAF67E"
                                    loading={isLoading}
                                    // cssOverride={{
                                    //     marginRight: "10px",
                                    // }}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />

                                <p
                                    className={`text-primary-200 font-semibold text-sm ${
                                        isLoading ? "hidden" : "block"
                                    }`}
                                >
                                    Send
                                </p>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
