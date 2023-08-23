import React, { useId, useEffect } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props<T> {
  field: Path<T & FieldValues>;
  register: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  label: string;
}

/**
 * A text input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators 
 * @param label - The label for the input
 */
const TextInputField = <T extends unknown>({
  field,
  register,
  registerOptions,
  label,
}: Props<T>) => {
  const inputId = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId}>{label}</label>
      <input type="text" id={inputId} {...register(field, registerOptions ?? {})} />
    </div>
  );
};

export default TextInputField;
