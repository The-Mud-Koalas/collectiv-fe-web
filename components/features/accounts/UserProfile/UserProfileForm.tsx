import { Button } from "@/components/shared/elements";
import {
  TextInputField,
  MultiselectInputField,
} from "@/components/shared/forms";
import { Loading } from "@/components/shared/layouts";
import { useAppContext } from "@/context/AppContext";
import { showErrorToast } from "@/lib/toast";
import { modifyUserProfile } from "@/utils/fetchers/interest";
import { numericValidator } from "@/utils/helpers/validator/numericValidator";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
interface FormFields {
  full_name?: string;
  preferred_radius?: number;
  tags?: SelectOption<string>[];
}

interface Props {
  tagsGet: UseQueryResult<Tag[], unknown>;
  userInterestGet: UseQueryResult<Tag[], unknown>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserProfileForm: React.FC<Props> = ({
  tagsGet,
  userInterestGet,
  setIsEdit,
}) => {
  const { userData, refetch } = useAppContext();
  const queryClient = useQueryClient();
  const userInterestMutate = useMutation({
    mutationFn: modifyUserProfile(queryClient, userData),
    onError: (error: Error) => showErrorToast({ error }),
    onSuccess: async () => {
      await Promise.all([
        refetch?.(),
        tagsGet.refetch(),
        userInterestGet.refetch(),
      ]);

      toast.success("Your personal profile is saved.");
      setIsEdit(false);
    },
  });
  const { handleSubmit, register, getValues, setValue, control } =
    useForm<FormFields>({
      defaultValues: {
        full_name: userData?.full_name,
        preferred_radius: userData?.preferred_radius!,
        tags:
          userInterestGet.data?.map((tag: Tag) => ({
            value: tag.id,
            label: tag.name,
          })) ?? [],
      },
    });
  const { isDirty } = useFormState({ control });
  const onSubmit: SubmitHandler<FormFields> = async ({
    full_name,
    preferred_radius,
    tags,
  }) => {
    const isTagsEqual = tags?.every((tag) => {
      return userInterestGet.data?.some((uItag) => uItag.name === tag.label);
    });

    if (!isDirty && isTagsEqual) {
      toast.info("No changes made.");
      setIsEdit(false);
      return;
    }

    await userInterestMutate.mutateAsync({ full_name, preferred_radius, tags });
  };

  if (tagsGet.isLoading || userInterestGet.isLoading) return <Loading />;
  if (tagsGet.isError || userInterestGet.isError) return <></>;
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <TextInputField
        field="full_name"
        registerOptions={{ required: "This field is required." }}
        label="Name"
        register={register}
      />
      <TextInputField
        field="preferred_radius"
        label="Preferred Radius (in km)"
        register={register}
        registerOptions={{
          required: "This field is required",
          validate: numericValidator("This field must be numeric."),
        }}
      />
      <MultiselectInputField
        field="tags"
        label="User Interests"
        getValue={getValues}
        setValue={setValue}
        control={control}
        options={tagsGet.data.map((tag: Tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
      />
      <div className="flex gap-3">
        <Button className="bg-primary-800 text-primary-300 w-fit px-4 py-1 rounded-md flex gap-3 items-center">
          <p>Save Edit</p>
          <FaSave />
        </Button>
        <Button
          type="button"
          onClick={() => setIsEdit(false)}
          className="bg-danger-500 text-white w-fit px-4 py-1 rounded-md flex gap-3 items-center"
        >
          <p>Cancel Edit</p>
          <MdCancel />
        </Button>
      </div>
    </form>
  );
};

export default UserProfileForm;
