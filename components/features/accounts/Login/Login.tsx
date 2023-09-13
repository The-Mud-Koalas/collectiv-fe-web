import { PasswordField, TextInputField } from "@/components/shared/forms";
import React from "react";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Inter } from "next/font/google";
import CollectivLogo from "@/components/shared/svg/logo/CollectivLogo";
import { Button } from "@/components/shared/elements";
import AccountNavbar from "../AccountNavbar";
import Link from "next/link";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { exactLengthValidator } from "@/utils/helpers/validator/lengthValidator";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import { useWindowSize } from "@/hooks/display";
import { inter } from "@/utils/constants/fonts";
import CollectivLogoHorizontal from "@/components/shared/svg/logo/CollectivLogoHorizontal";
interface Props {
  form: UseFormReturn<LoginFormFields>;
  onSubmit: SubmitHandler<LoginFormFields>;
  onError: SubmitErrorHandler<FieldError>;
  isLoading: boolean;
}

const Login: React.FC<Props> = ({ form, onSubmit, onError, isLoading }) => {
  const { register, handleSubmit } = form;
  const { windowWidth } = useWindowSize();

  return (
    <>
      <AccountNavbar />
      <div className="grid place-items-center">
        <div
          className={`${inter.className} flex flex-col px-5 py-8 md:py-[5%] gap-6 max-w-xl w-full`}
        >
          <div>
            <h1 className="text-2xl font-bold md:text-4xl">Sign In to</h1>
            <div className="bg-secondary-200 w-fit px-1 my-2">
              <CollectivLogoHorizontal size={windowWidth >= 768 ? "xl" : "lg"} colorCode="slate-950"/>
            </div>
          </div>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <TextInputField
              label="Email"
              field="email"
              register={register}
              registerOptions={{
                pattern: {
                  value: EMAIL_REGEX,
                  message: "The email you entered is invalid",
                },
                required: "This field should not be left empty.",
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
            <Link
              href="/accounts/forget"
              className="text-xs sm:text-sm sm:font-semibold underline"
            >
              Forgot password?
            </Link>
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary-700 flex justify-center items-center p-3 rounded-lg"
            >
              <p className="text-primary-200 font-semibold text-sm">Sign In</p>
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

export default Login;
