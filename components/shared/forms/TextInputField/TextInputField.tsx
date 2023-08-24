import { Inter } from "next/font/google";
import React, { useId, useEffect } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T> {
  field: Path<T & FieldValues>;
  register: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  label: string;
}

const inter = Inter({ subsets: ["latin"] });

/**
 * A text input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators
 * @param [placeholder] - Placeholder for the input column
 * @param label - The label for the input
 */
const TextInputField = <T extends unknown>({
  field,
  register,
  registerOptions,
  placeholder,
  label,
}: Props<T>) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-xs sm:text-sm font-medium`}
      >
        {label}
      </label>
      <input
        className={`${inter.className} bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px]`}
        type="text"
        id={inputId}
        placeholder={placeholder}
        {...register(field, registerOptions ?? {})}
      />
    </div>
  );
};

export default TextInputField;
