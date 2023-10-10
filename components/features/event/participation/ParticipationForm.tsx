import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { FC, MouseEvent } from "react";
import { toast } from "react-toastify";
import {
    FieldError,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { EMAIL_REGEX } from "@/utils/constants/regex";

interface ParticipationFormProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ParticipationForm: FC<ParticipationFormProps> = ({ setShowModal }) => {
    const form = useForm<EventParticipationFormFields>();
    const { register, handleSubmit } = form;
    const router = useRouter();

    const { mutateAsync, isLoading } = useMutation({
        // mutationFn: ,
        onSuccess: (user) => {
            form.reset();
            router.push("/");
        },
        onError: (error) => {
            if (error) {
                // const errorMessage = "";
                // console.log(errorMessage);
                return;
            }

            console.log("An error occured.");
        },
    });

    function validateEmailOrPhoneField() {}

    const onSubmit: SubmitHandler<EventParticipationFormFields> = async (
        data
    ) => {
        // mutateAsync(data);
    };

    const onError: SubmitErrorHandler<FieldError> = (error) => {
        const errors = Object.values(error).map(
            (item) => item.message
        ) as string[];
        toast.error(errors?.[0]);
    };

    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <form className="flex flex-col gap-4">
            <div className="my-10">
                <div className="mb-6">
                    <TextInputField
                        field="name"
                        label="Enter your name"
                        // register={register}
                        // error={errors.name}
                    />
                </div>
                <TextInputField
                    field="email"
                    label="Enter your email"
                    register={register}
                    registerOptions={{
                        pattern: {
                            value: EMAIL_REGEX,
                            message: "The email you entered is invalid",
                        },
                    }}
                />
            </div>

            <div className="flex flex-row justify-center gap-3">
                <Button
                    onClick={(e) => handleClose(e)}
                    className="border border-primary-800 rounded-full text-primary-800 py-3 w-[327px]"
                >
                    Cancel
                </Button>
                <Button
                    // disabled={isLoading}
                    type="submit"
                    className="bg-primary-800 flex justify-center items-center py-3 w-[327px] rounded-3xl"
                >
                    <p className="text-primary-200 font-semibold text-sm">
                        Register
                    </p>
                </Button>
            </div>
        </form>
    );
};

export default ParticipationForm;
