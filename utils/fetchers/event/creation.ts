import { getRequest, postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { QueryClient, QueryFunction } from "@tanstack/react-query";

const getServiceCategories = async () => {
    const categories: Category[] = await getRequest({
        endpoint: "/event/category/all",
    });
    return categories;
};

const getTags: QueryFunction<Tag[], string[], any> = async ({ queryKey }) => {
    const result = await getRequest({ endpoint: "/event/tags" });
    return result;
};

const getLocations: QueryFunction<
    EventLocation[],
    string[],
    any
> = async () => {
    const result = await getRequest({ endpoint: "/space/all" });
    return result;
};

const getSubscribedLocations: QueryFunction<
    EventLocation[],
    string[],
    any
> = async () => {
    const idToken = await auth.currentUser?.getIdToken();

    const result = await getRequest({
        endpoint: "/space/subscribed",
        token: idToken,
    });
    return result;
};

const getProjectUnitGoals: QueryFunction<
  GoalKind[],
  string[],
  any
> = async ({ queryKey }) => {
    const [_, __, searchParam] = queryKey;

  const goalKinds = await getRequest({ endpoint: "/event/project/goal-kinds/all" })
  return goalKinds;
};

const createEvent = (queryClient: QueryClient) => async (values: NewEventFields) => {
  const { eventValues, isProject } = values;
  queryClient.invalidateQueries({queryKey: ["event"]});
  queryClient.invalidateQueries({queryKey: ["tags"]});
  const idToken = await auth.currentUser?.getIdToken();

    const tagList: { id: string; name: string }[] = await postRequest({
        endpoint: "/event/tags/get-or-create/multiple",
        body: { tags: eventValues.tags?.map((tag) => tag.label) ?? [] },
        token: idToken,
    });

    const eventFields = {
        name: eventValues.name,
        description: eventValues.description,
        is_project: isProject,
        project_goal: Number(eventValues.project_goal),
        goal_measurement_unit: eventValues.goal_measurement_unit?.value ?? "",
        start_date_time: eventValues.start_date_time.toISOString(),
        end_date_time: eventValues.end_date_time.toISOString(),
        location_id: eventValues.location.value,
        category_id: eventValues.category.value,
        tags: tagList.map((tag) => tag.id),
        min_num_of_volunteers: 1,
        goal_kind: eventValues.goal_kind?.value,
    };

    const newEvent = await postRequest({
        endpoint: "/event/create",
        body: eventFields,
        token: idToken,
    });

    return newEvent;
};

export {
    getServiceCategories,
    getProjectUnitGoals,
    createEvent,
    getTags,
    getLocations,
    getSubscribedLocations,
};
