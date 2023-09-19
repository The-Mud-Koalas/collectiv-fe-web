import { inter } from "@/utils/constants/fonts";
import React, { useId, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Path,
  FieldValues,
  Control,
  RegisterOptions,
  FieldError,
  Controller,
} from "react-hook-form";
import styles from "./DateField.module.css";
import { COLORS } from "@/utils/constants/colors";
import { motion } from "framer-motion";
import { Calendar } from "../../svg/icons";
import { FieldErrorMessage } from "../FieldErrorMessage";

interface Props<T> extends Partial<React.ComponentProps<typeof DatePicker>> {
  field: Path<T & FieldValues>;
  label: string;
  control?: Control<T & FieldValues>;
  rules?: RegisterOptions;
  error?: FieldError;
}

interface CCProps extends React.PropsWithChildren {
  className: string;
}

const inputFieldVariant = (error?: FieldError) => ({
  focus: {
    boxShadow: `0px 0px 0px 2px ${
      error == null ? COLORS.secondary[400] : COLORS.danger[400]
    }`,
  },
  blur: {
    boxShadow: "1px 1px 1px 1px rgba(255,255,255,0.01)",
  },
});

const CustomCalendar: React.FC<CCProps> = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div className={inter.className}>{children}</div>
    </CalendarContainer>
  );
};

const DateField = <T extends unknown>({
  field,
  label,
  control,
  rules,
  error,
  ...otherProps
}: Props<T>) => {
  const [isFocus, setFocus] = useState(false);
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label}
      </label>
      <motion.div
        variants={inputFieldVariant(error)}
        animate={isFocus ? "focus" : "blur"}
        className="flex flex-row gap-2 justify-between bg-gray-50 px-3 py-3 text-sm sm:text-base rounded-lg border-gray-300 border-[1.5px]"
      >
        <Controller
          control={control}
          name={field}
          rules={rules}
          render={({
            field: { value, ref: fieldRef, onBlur, onChange }
          }) => (
            <DatePicker
              {...otherProps}
              onChange={onChange}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                onBlur();
                setFocus(false);
              }}
              calendarContainer={CustomCalendar}
              className={`${inter.className} outline-none bg-transparent w-full `}
              selected={value}
              ref={(ref) => {
                fieldRef({
                  focus: ref?.setFocus
                })
              }}
            />
          )}
        />
        <Calendar color={COLORS.gray[400]} dimensions={{ width: 20 }} />
      </motion.div>
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default DateField;
