import React from "react";
import AccountNavbar from "../AccountNavbar";
import Back from "@/components/shared/svg/icons/Back";
import { COLORS } from "@/utils/constants/colors";
import Link from "next/link";
import { Inter } from "next/font/google";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { TextInputField } from "@/components/shared/forms";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { Button } from "@/components/shared/elements";

interface FormFields {
  email: string;
}

const inter = Inter({ subsets: ["latin"] });

const ForgetPassword: React.FC = () => {
  const { handleSubmit, register } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormFields> = (error) => {
    console.log(error);
  };

  return (
    <>
      <AccountNavbar />
      <div className="grid place-items-center">
        <div
          className={`flex flex-col px-5 py-8 gap-6 ${inter.className} md:py-[5%] max-w-xl w-full`}
        >
          <div className="flex flex-col gap-2">
            <Link href="/accounts/login">
              <Back dimensions={{ width: 32 }} color={COLORS.primary[700]} />
            </Link>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Forgot Password
            </h1>
            <p className="text-sm md:text-base font-medium">
              Enter the email you used when you joined and we&apos;ll{" "}
              <span className="bg-tertiary">send you a link to reset</span> your
              password.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <TextInputField
              field="email"
              label="Email"
              register={register}
              registerOptions={{
                pattern: {
                  value: EMAIL_REGEX,
                  message: "The email you entered is invalid",
                },
              }}
              placeholder="Email"
            />
            <Button className="bg-primary-700 flex justify-center items-center p-3 rounded-lg">
              <p className="text-primary-200 font-semibold text-sm">Send</p>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
