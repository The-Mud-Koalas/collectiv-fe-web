import { inter } from "@/utils/constants/fonts";
import { Inter } from "next/font/google";
import { useId } from "react";
import {
    Controller, FieldValues,
    Path
} from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props<T> {
    field: Path<T & FieldValues>;
    label: string;
    control: any;
}

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

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={inputId}
                className={`${inter.className} text-xs sm:text-sm font-medium`}
            >
                {label}
            </label>
            <div className="flex flex-row gap-2 justify-between">
                <Controller
                    name={field}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            className={`${inter.className} w-full sm:text-base`}
                            defaultCountry="au"
                            value={value}
                            onChange={onChange}
                            inputStyle={{
                                fontSize: "16px",
                                height: "48px",
                                borderRadius: "0 10px 10px 0",
                                borderColor: "gray",
                                width: "100%",
                            }}
                            countrySelectorStyleProps={{
                                buttonStyle: {
                                    fontSize: "16px",
                                    height: "48px",
                                    borderRadius: "10px 0 0 10px",
                                    borderColor: "gray",
                                    padding: "10px",
                                },
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default PhoneNumberField;