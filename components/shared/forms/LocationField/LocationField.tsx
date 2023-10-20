import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import React, { useEffect, useId } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { FieldErrorMessage } from "../FieldErrorMessage";

interface Props<T> {
  field: Path<T & FieldValues>;
  label: string;
  control?: Control<T & FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError;
  setValue: UseFormSetValue<T & FieldValues>;
  placeholder?: string;
}

const components = {
  DropdownIndicator: null,
};

const LocationField = <T extends unknown>({
  field,
  label,
  control,
  rules,
  error,
  setValue: setFormValue,
  placeholder,
}: Props<T>) => {
  const {
    ready,
    value,
    setValue: setAutocompleteValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  placeholder ??= "";

  const inputId = useId();

  const handleSelect = async (data: SelectOption<string> | null) => {
    if (data == null) return;

    const { label: placeName } = data;
    setAutocompleteValue(placeName, false);
    clearSuggestions();

    const results = await getGeocode({ address: placeName });
    const { lat, lng } = getLatLng(results[0]);

    const placeData = {
      latitude: lat,
      longitude: lng,
      name: placeName,
    } as PathValue<T & FieldValues, Path<T & FieldValues>>;

    setFormValue(field, placeData);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label} { rules?.required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({ field: { ref } }) => (
          <Select
            id={inputId}
            ref={ref}
            placeholder={placeholder}
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
              loadingIndicator: () => "text-gray-300",
              noOptionsMessage: () => "px-4 py-2 text-gray-400",
              loadingMessage: () => "px-4 py-2 text-gray-400",
              placeholder: () => "text-gray-400",
              container: () => `${inter.className} transition-all rounded-lg`,
              indicatorSeparator: () => "opacity-0",
              control: () =>
                `flex flex-row gap-2 justify-between bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px]`,
              input: () => `cursor-text outline-none bg-transparent w-full `,
              valueContainer: () => "bg-transparent cursor-pointer",
              dropdownIndicator: (state) =>
                `${state.isFocused && "text-gray-800"} text-gray-300`,
              menu: () =>
                "mt-2 border-2 border-black bg-gray-50 rounded-xl drop-shadow-md overflow-hidden w-full",
              option: (state) =>
                `${
                  state.isFocused ? "bg-primary-300" : "bg-transparent"
                } transition-all px-4 py-2`,
            }}
            isLoading={status === "" && value !== ""}
            isDisabled={!ready}
            onChange={handleSelect}
            onInputChange={(newData) => setAutocompleteValue(newData)}
            components={components}
            options={
              status === "OK"
                ? data.map((loc) => ({
                    value: loc.place_id,
                    label: loc.description,
                  }))
                : []
            }
          />
        )}
      />
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default LocationField;
