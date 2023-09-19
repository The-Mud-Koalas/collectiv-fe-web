import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useId } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select from "react-select";
import { FieldErrorMessage } from "../FieldErrorMessage";

interface Props<TForm, TOption> extends React.ComponentProps<typeof Select> {
  field: Path<TForm & FieldValues>;
  label: string;
  options: TOption[];
  control?: Control<TForm & FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError;
}

const SelectField = <TForm extends unknown, TOption extends unknown>({
  field,
  label,
  options,
  error,
  control,
  rules
}: Props<TForm, TOption>) => {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({
          field: { value, ref, onBlur, onChange },
          fieldState: { error },
        }) => (
          <Select
            unstyled
            styles={{
              container: (baseStyle, state) => ({
                ...baseStyle,
                boxShadow: state.isFocused
                  ? `0px 0px 0px 2px ${
                      error == null ? COLORS.secondary[400] : COLORS.danger[400]
                    }`
                  : "1px 1px 1px 1px rgba(255,255,255,0.01)",
              }),
            }}
            classNames={{
              placeholder: () => "text-gray-400",
              container: () => `${inter.className} transition-all rounded-lg`,
              indicatorSeparator: () => "opacity-0",
              control: () =>
                `flex flex-row gap-2 justify-between bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px]`,
              input: () => `outline-none bg-transparent w-full `,
              valueContainer: () => "bg-transparent cursor-pointer",
              dropdownIndicator: (state) =>
                `${state.isFocused && "text-gray-800"} text-gray-300`,
              menu: () =>
                "mt-2 border-2 border-black bg-gray-50 rounded-xl drop-shadow-md overflow-hidden w-full",
              option: (state) => `${state.isFocused ? "bg-primary-300" : "bg-transparent"} transition-all px-4 py-2`
            }}
            options={options as any}
            value={value}
            onChange={onChange}
            ref={ref}
            onBlur={onBlur}
          />
        )}
      />
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default SelectField;