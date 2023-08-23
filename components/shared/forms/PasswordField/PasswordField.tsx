import React, { useState, useId } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props<T> {
  field: Path<T & FieldValues>;
  register: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  label: string;
}

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
  const inputId = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId}>{label}</label>
      <div className="flex flex-row">
        <input
          type={isVisible ? "text" : "password"}
          id={inputId}
          {...register(field, registerOptions ?? {})}
        />
        <button onClick={() => setIsVisible(prev => !prev)}>Show</button>
      </div>
    </div>
  );
};

export default PasswordField;
