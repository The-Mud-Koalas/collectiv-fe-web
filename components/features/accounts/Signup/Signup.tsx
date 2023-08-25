import React from "react";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import AccountNavbar from "../AccountNavbar";
import { Inter } from "next/font/google";
import CollectivLogo from "@/components/shared/svg/CollectivLogo";
import { PasswordField, TextInputField } from "@/components/shared/forms";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { exactLengthValidator } from "@/utils/helpers/validator/lengthValidator";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { Button } from "@/components/shared/elements";
import Link from "next/link";
import { useWindowSize } from "@/hooks/display";

interface Props {
  form: UseFormReturn<SignupFormFields>;
  onSubmit: SubmitHandler<SignupFormFields>;
  onError: SubmitErrorHandler<FieldError>;
  isLoading: boolean;
}

const inter = Inter({ subsets: ["latin"] });

const Signup: React.FC<Props> = ({ form, onSubmit, onError, isLoading }) => {
  const { handleSubmit, register } = form;
  const { windowWidth } = useWindowSize();

  return (
    <>
      <AccountNavbar />
      <div className="grid place-items-center">
        <div
          className={`${inter.className} flex flex-col px-5 py-8 md:py-[5%] gap-6 max-w-xl w-full`}
        >
          <div>
            <h1 className="text-2xl font-semibold md:text-4xl">Register to</h1>
            <div className="bg-tertiary w-fit px-1">
              <CollectivLogo
                dimensions={{ width: windowWidth >= 768 ? 260 : 140 }}
                color="black"
              />
            </div>
          </div>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <TextInputField field="name" label="Name" register={register} />

            <TextInputField
              field="email"
              label="Email"
              register={register}
              registerOptions={{
                pattern: {
                  value: EMAIL_REGEX,
                  message: "The email you entered is invalid.",
                },
                required: "This field should not be left empty."
              }}
            />

            <PasswordField
              label="Password"
              field="password"
              register={register}
              registerOptions={{
                validate: {
                  isNumeric: numericValidator,
                  isLengthSix: exactLengthValidator(6),
                },
                required: "This field should not be left empty.",
              }}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary-700 flex justify-center items-center p-3 rounded-lg"
            >
              <p className="text-primary-200 font-semibold text-sm">Register</p>
            </Button>

            <p className="text-xs sm:text-sm">
              Already a member?{" "}
              <Link
                href="/accounts/login"
                className="underline text-primary-700 sm:font-semibold"
              >
                Sign in Now
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
