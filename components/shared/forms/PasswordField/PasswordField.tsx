import { COLORS } from "@/utils/constants/colors";
import { Inter } from "next/font/google";
import React, { useState, useId } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import Eye from "../../svg/icons/Eye";

interface Props<T> {
  field: Path<T & FieldValues>;
  register: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  label: string;
}

const inter = Inter({subsets: ["latin"]})

/**
 * A password input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators
 * @param label - The label for the input
 */
const PasswordField = <T extends unknown>({
  field,
  register,
  registerOptions,
  label,
}: Props<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className={`${inter.className} text-xs sm:text-sm font-medium`}>{label}</label>
      <div className="flex flex-row gap-2 justify-between bg-gray-50 text-sm px-3 py-3 rounded-lg border-gray-300 border-[1.5px]">
        <input
          className={`${inter.className} bg-transparent w-full sm:text-base`}
          type={isVisible ? "text" : "password"}
          id={inputId}
          {...register(field, registerOptions ?? {})}
        />
        <button type="button" onClick={() => setIsVisible(prev => !prev)}>
          {
            isVisible ? <Eye color={COLORS.gray[400]} dimensions={{width: 20}}/> : <Eye color={COLORS.gray[400]} dimensions={{width: 20}}/>
          }
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
