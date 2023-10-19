import { getRequest, postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { QueryClient } from "@tanstack/react-query";

export const getUserInterest = async () => {
  const token = await auth.currentUser?.getIdToken();
  const userInterests = await getRequest({
    endpoint: "/user/interests",
    token,
  });

  return userInterests as Tag[];
};

interface FormFields {
  full_name?: string;
  preferred_radius?: number;
  tags?: SelectOption<string>[];
}
export const modifyUserProfile =
  (queryClient: QueryClient, userData?: UserData | null) =>
  async (data: FormFields) => {
    if (!userData) return;
    const token = await auth.currentUser?.getIdToken();
    const tagList: Tag[] = await postRequest({
      endpoint: "/event/tags/get-or-create/multiple",
      body: {tags: data.tags?.map((tag) => tag.label) ?? []},
      token,
    });

    const modifiedProfileBody = {
      full_name: data.full_name,
      preferred_radius: Number(data.preferred_radius),
      location_track: userData.location_track,
    };

    const modifyProfile = await postRequest({
      endpoint: "/user/update",
      body: modifiedProfileBody,
      token,
    });

    const modifyInterest = await postRequest({
      endpoint: "/user/interests/update",
      body: {tags: tagList.map((tag) => tag.id)},
      token,
    });
    return { ...modifyProfile, modifyInterest };
  };
