import { useAppContext } from "@/context/AppContext";
import { garamond } from "@/utils/constants/fonts";
import React, { useState } from "react";
import cn from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInterest } from "@/utils/fetchers/interest";
import { Loading } from "@/components/shared/layouts";
import { Button } from "@/components/shared/elements";
import { FaEdit } from "react-icons/fa";
import {
  MultiselectInputField,
  TextInputField,
} from "@/components/shared/forms";
import { MdCancel } from "react-icons/md";
import { getTags } from "@/utils/fetchers/event/creation";
import UserProfileForm from "./UserProfileForm";


const UserProfile = () => {
  const { userData } = useAppContext();
  const userInterestGet = useQuery({
    queryKey: ["interest"],
    queryFn: getUserInterest,
  });
  const tagsGet = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
  const [isEdit, setIsEdit] = useState(false);
  

  if (userInterestGet.isLoading || tagsGet.isLoading) return <Loading />;
  if (userInterestGet.isError || tagsGet.isError) return <></>;

  return (
    <section id="user-profile" className="flex mt-4 justify-between gap-3">
      {isEdit ? (
        <UserProfileForm setIsEdit={setIsEdit} tagsGet={tagsGet} userInterestGet={userInterestGet}/>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p
              className={cn(
                garamond.className,
                "text-primary-800 italic text-sm"
              )}
            >
              Name
            </p>
            <h4 className="text-lg font-semibold">
              {userData?.full_name ?? "Anonymous"}
            </h4>
          </div>
          <div className="flex flex-col">
            <p
              className={cn(
                garamond.className,
                "text-primary-800 italic text-sm"
              )}
            >
              Preferred Radius
            </p>
            <h4 className="text-lg font-semibold">
              {userData?.preferred_radius} km
            </h4>
          </div>
          <div className="flex flex-col">
            <p
              className={cn(
                garamond.className,
                "text-primary-800 italic text-sm"
              )}
            >
              Interests
            </p>
            <div className="flex gap-3 w-96 flex-wrap">
              {userInterestGet.data.map((tag) => (
                <div
                  className="border-2 rounded-full px-3 border-primary-800 text-sm"
                  key={tag.id}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={() => setIsEdit(true)}
            className="bg-primary-800 text-primary-300 w-fit px-4 py-1 rounded-md flex gap-3 items-center"
          >
            <p>Edit Profile</p>
            <FaEdit />
          </Button>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
