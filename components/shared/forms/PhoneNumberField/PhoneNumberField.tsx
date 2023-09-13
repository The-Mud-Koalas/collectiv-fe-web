import { COLORS } from "@/utils/constants/colors";
import { Inter } from "next/font/google";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import React, { useState, useId } from "react";
import { Controller, Control } from "react-hook-form";
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";
import Eye from "../../svg/icons/Eye";
import { PHONE_REGEX } from "@/utils/constants/regex";

interface Props<T> {
    field: Path<T & FieldValues>;
    label: string;
    control: any;
}

const inter = Inter({ subsets: ["latin"] });

/**
 * A phone number input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators
 * @param label - The label for the input
 */
const PhoneNumberField = <T extends unknown>({
    field,
    label,
    control,
}: Props<T>) => {
    const inputId = useId();
    //const [phone, setPhone] = useState<string>("");
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={inputId}
                className={`${inter.className} text-xs sm:text-sm font-medium`}
            >
                {label}
            </label>
            <div className="flex flex-row gap-2 justify-between bg-gray-50 text-sm px-3 py-3 rounded-lg border-gray-300 border-[1.5px]">
                <Controller
                    name={field}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            className={`${inter.className} bg-transparent w-full sm:text-base mt-50`}
                            defaultCountry="au"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default PhoneNumberField;
