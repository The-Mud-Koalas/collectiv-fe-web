import { inter } from "@/utils/constants/fonts";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import React from "react";
import Select, { SingleValueProps, components } from "react-select";

interface Props {
  filterOptions: SelectOption<string>[];
  filterName: string;
  onChange: (value: SelectOption<string> | null) => void;
}

const getSVComponent = (fieldName: string) => {
  const SingleValue = ({
    children,
    ...props
  }: SingleValueProps<SelectOption<string>>) => {
    return (
      <components.SingleValue {...props} className="!max-w-[14ch] !overflow-hidden !text-ellipsis">
        {capitalize(fieldName)}: {children}
      </components.SingleValue>
    );
  };

  SingleValue.displayName = "SingleValue";

  return SingleValue;
};

const Filter: React.FC<Props> = ({ filterOptions, filterName, onChange }) => {
  return (
    <Select
      unstyled
      classNames={{
        container: (state) =>
          `rounded-full border-2 border-primary-800 font-medium ${inter.className} text-sm m-0 px-2 py-0.5`,
        control: () => "!min-h-fit flex items-center gap-1",
        clearIndicator: (state) => `w-4`,
        dropdownIndicator: (state) => `w-4`,
        menu: () =>
          "mt-1 border-2 border-black bg-gray-50 rounded-xl drop-shadow-md overflow-hidden w-full",
        option: (state) =>
          `${
            state.isFocused ? "bg-primary-300" : "bg-transparent"
          } text-center transition-all w-full ${state.isSelected && "bg-primary-300"}`,
      }}
      components={{
        SingleValue: getSVComponent(filterName),
        IndicatorSeparator: null,
      }}
      onChange={onChange as any}
      placeholder={`All ${capitalize(filterName)}`}
      isClearable={true}
      isSearchable={false}
      options={filterOptions}
    />
  );
};

export default Filter;
