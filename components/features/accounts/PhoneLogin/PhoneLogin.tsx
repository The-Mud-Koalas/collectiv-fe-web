import { PhoneNumberField } from "@/components/shared/forms";
import React from "react";
import {
    FieldError,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormReturn,
} from "react-hook-form";
import { Inter } from "next/font/google";
import CollectivLogo from "@/components/shared/svg/CollectivLogo";
import { Button } from "@/components/shared/elements";
import AccountNavbar from "../AccountNavbar";
import Link from "next/link";
import { PHONE_REGEX } from "@/utils/constants/regex";
import { exactLengthValidator } from "@/utils/helpers/validator/lengthValidator";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { useWindowSize } from "@/hooks/display";

interface Props {
    form: UseFormReturn<PhoneLoginFormFields>;
    onSubmit: SubmitHandler<PhoneLoginFormFields>;
    onError: SubmitErrorHandler<FieldError>;
    isLoading: boolean;
}

const inter = Inter({ subsets: ["latin"] });

const PhoneLogin: React.FC<Props> = ({
    form,
    onSubmit,
    onError,
    isLoading,
}) => {
    const { handleSubmit, control } = form;
    const { windowWidth } = useWindowSize();

    return (
        <>
            
            <div className="grid place-items-center">
                <div
                    className={`${inter.className} flex flex-col px-5 py-8 md:py-[5%] gap-6 max-w-xl w-full`}
                >
                    <div>
                        <h1 className="text-2xl font-bold md:text-4xl">
                            Sign In to
                        </h1>
                        <div className="bg-tertiary w-fit px-1 my-1">
                            <CollectivLogo
                                color="black"
                                dimensions={{
                                    width: windowWidth >= 768 ? 260 : 140,
                                }}
                            />
                        </div>
                    </div>
                    <form
                        className="flex flex-col gap-4 w-full"
                        onSubmit={handleSubmit(onSubmit, onError)}
                    >
                        <PhoneNumberField
                            label="Phone Number"
                            field="phoneNumber"
                            control={control}
                        />

                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="bg-primary-700 flex justify-center items-center p-3 rounded-lg"
                        >
                            <p className="text-primary-200 font-semibold text-sm">
                                Sign In
                            </p>
                        </Button>
                        <p className="text-xs sm:text-sm">
                            Not a member?{" "}
                            <Link
                                href="/accounts/signup"
                                className="underline text-primary-700 sm:font-semibold"
                            >
                                Register now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PhoneLogin;
