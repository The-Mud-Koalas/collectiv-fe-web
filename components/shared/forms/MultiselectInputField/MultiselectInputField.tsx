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

interface Props<TForm> {
  field: Path<TForm & FieldValues>;
  label: string;
  control?: Control<TForm & FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError;
  setValue: UseFormSetValue<TForm & FieldValues>;
  getValue: UseFormGetValues<TForm & FieldValues>;
  placeholder?: string;
}

const components = {
  ...makeAnimate(),
  DropdownIndicator: null,
};

const MultiselectInputField = <TForm extends unknown>({
  field,
  label,
  error,
  control,
  rules,
  setValue,
  getValue,
  placeholder,
}: Props<TForm>) => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");
  placeholder ??= "";

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (!inputValue) return;

    switch (e.key) {
      case "Enter":
      case "Tab":
        const fieldValues = getValue()[field] as SelectOption<string>[];
        if (
          fieldValues != null &&
          fieldValues.some((value) => value.value === inputValue)
        ) {
          setInputValue("");
          return;
        }

        const newValuesList = [
          ...(fieldValues ?? []),
          createOption(inputValue),
        ] as PathValue<TForm & FieldValues, Path<TForm & FieldValues>>;
        setValue(field, newValuesList);
        setInputValue("");
        e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label} { rules?.required && <span className="text-red-600">*</span> }
      </label>
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({ field: { value } }) => (
          <Creatable
            id={inputId}
            placeholder={placeholder}
            styles={{
              container: (baseStyle, state) => ({
                ...baseStyle,
                boxShadow: state.isFocused
                  ? `0px 0px 0px 2px ${
                      error == null ? COLORS.secondary[400] : COLORS.danger[400]
                    }`
                  : "1px 1px 1px 1px rgba(255,255,255,0.01)",
              }),
              multiValue: (baseStyle) => ({
                ...baseStyle,
                padding: "2px 4px",
              }),
            }}
            unstyled
            classNames={{
              placeholder: () => "text-gray-400",
              clearIndicator: (state) =>
                `${state.isFocused && "text-gray-800"} text-gray-300`,
              input: () => "cursor-text",
              valueContainer: () => "gap-1",
              multiValue: () =>
                "bg-secondary-200 justify-center flex gap-1 items-center rounded-full w-fit text-sm text-secondary-500",
              container: () => `${inter.className} transition-all rounded-lg`,
              control: () =>
                `flex flex-row gap-2 justify-between bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px]`,
            }}
            menuIsOpen={false}
            isMulti
            isClearable
            components={components}
            inputValue={inputValue}
            value={value}
            onInputChange={(newVal) => setInputValue(newVal)}
            onKeyDown={handleKeyDown}
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
