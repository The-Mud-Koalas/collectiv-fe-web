import { Template } from "@/components/shared/layouts";
import React from "react";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";
import UserProfile from "@/components/features/accounts/UserProfile/UserProfile";

const ProfilePage = () => {
  return (
    <Template>
      <div className={cn(inter.className, "px-6 py-4")}>
        <h1 className="text-3xl md:text-4xl font-semibold">My Profile</h1>
        <UserProfile />
      </div>
    </Template>
  );
};

export default ProfilePage;
