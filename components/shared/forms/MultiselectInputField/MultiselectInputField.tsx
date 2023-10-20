import { inter } from "@/utils/constants/fonts";
import React, { useId, useState } from "react";
import {
  Path,
  FieldValues,
  Control,
  RegisterOptions,
  FieldError,
  Controller,
  UseFormSetValue,
  UseFormGetValues,
  PathValue,
} from "react-hook-form";
import Creatable from "react-select/creatable";
import makeAnimate from "react-select/animated";
import { COLORS } from "@/utils/constants/colors";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/utils";
import { useWindowSize } from "@/hooks/display";
import { BREAKPOINTS } from "@/utils/constants/breakpoints";

interface Props<TForm, TOption> {
  field: Path<TForm & FieldValues>;
  label: string;
  control?: Control<TForm & FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError;
  setValue: UseFormSetValue<TForm & FieldValues>;
  getValue: UseFormGetValues<TForm & FieldValues>;
  options: SelectOption<string>[];
  placeholder?: string;
}

const MultiselectInputField = <TForm extends unknown, TOption extends unknown>({
  field,
  label,
  error,
  control,
  rules,
  setValue,
  getValue,
  placeholder,
  options
}: Props<TForm, TOption>) => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");

  const { windowWidth } = useWindowSize();
  const isSmallScreen = windowWidth < BREAKPOINTS.sm;
  const components = isSmallScreen
    ? { ...makeAnimate(), DropdownIndicator: null, ClearIndicator: null }
    : { ...makeAnimate(), DropdownIndicator: null };

  placeholder ??= "";


  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label} {rules?.required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({ field: { value } }) => (
          <Creatable
            id={inputId}
            placeholder={placeholder}
            styles={
              !isSmallScreen
                ? {
                    container: (baseStyle, state) => ({
                      ...baseStyle,
                      boxShadow: state.isFocused
                        ? `0px 0px 0px 2px ${
                            error == null
                              ? COLORS.secondary[400]
                              : COLORS.danger[400]
                          }`
                        : "1px 1px 1px 1px rgba(255,255,255,0.01)",
                    }),
                    multiValue: (baseStyle) => ({
                      ...baseStyle,
                      padding: "2px 4px",
                    }),
                  }
                : {
                    multiValue: (baseStyle) => ({
                      ...baseStyle,
                      padding: "2px 4px",
                    }),
                  }
            }
            unstyled
            classNames={
              isSmallScreen
                ? {
                    loadingIndicator: () => "text-gray-300",
                    placeholder: () => "text-gray-400",
                    indicatorsContainer: () => "flex !items-end",
                    clearIndicator: (state) =>
                      `${state.isFocused && "text-gray-800"} text-gray-300`,
                    input: () =>
                      "!order-1 bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px] w-full cursor-text",
                    valueContainer: () =>
                      "flex flex-row !flex-wrap-reverse gap-1",
                    multiValue: () =>
                      "bg-secondary-200 justify-center flex gap-1 items-center rounded-full w-fit text-sm text-secondary-500",
                    container: () =>
                      `${inter.className} transition-all rounded-lg`,
                    menu: () =>
                      "mt-2 border-2 border-black bg-gray-50 rounded-xl drop-shadow-md overflow-hidden w-full",
                    option: (state) =>
                      `${
                        state.isFocused ? "bg-primary-300" : "bg-transparent"
                      } transition-all px-4 py-2`,
                  }
                : {
                    loadingIndicator: () => "text-gray-300",
                    placeholder: () => "text-gray-400",
                    clearIndicator: (state) =>
                      `${state.isFocused && "text-gray-800"} text-gray-300`,
                    input: () => "cursor-text",
                    valueContainer: () => "gap-1",
                    multiValue: () =>
                      "bg-secondary-200 justify-center flex gap-1 items-center rounded-full w-fit text-sm text-secondary-500",
                    container: () =>
                      `${inter.className} transition-all rounded-lg`,
                    control: () =>
                      `flex flex-row gap-2 justify-between bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px]`,
                    menu: () =>
                      "mt-2 border-2 border-black bg-gray-50 rounded-xl drop-shadow-md overflow-hidden w-full",
                    option: (state) =>
                      `${
                        state.isFocused ? "bg-primary-300" : "bg-transparent"
                      } transition-all px-4 py-2`,
                  }
            }
            options={options as any}
            isMulti
            isClearable
            components={components as any}
            inputValue={inputValue}
            value={value}
            onInputChange={(newVal) => setInputValue(newVal)}
            onChange={(newValue) =>
              setValue(
                field,
                newValue as PathValue<
                  TForm & FieldValues,
                  Path<TForm & FieldValues>
                >
              )
            }
          />
        )}
      />
    </div>
  );
};

export default MultiselectInputField;
