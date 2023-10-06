import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { FC } from "react";

interface ParticipationFormProps {}

const ParticipationForm: FC<ParticipationFormProps> = ({}) => {
    return (
        <form className="flex flex-col gap-4">
            <TextInputField
                field="name"
                label="Enter your name"
                // register={register}
                // error={errors.name}
            />
            <div className="flex flex-row justify-center gap-3">
                <Button className="border border-primary-800 rounded-full text-primary-800 py-3 w-[327px]">
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
