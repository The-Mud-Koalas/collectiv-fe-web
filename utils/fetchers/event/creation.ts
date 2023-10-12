import { getRequest, postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { QueryFunction } from "@tanstack/react-query";

const getServiceCategories = async () => {
  const token = await auth.currentUser?.getIdToken();
  const categories: Category[] = await getRequest({
    endpoint: "/event/category/all",
    token,
  });
  return categories.map((cat) => ({
    value: cat.id,
    label: capitalize(cat.name, true),
  }));
};

const getTags: QueryFunction<SelectOption<string>[], string[], any> = async ({
  queryKey,
}) => {
  const [_, __, searchParam] = queryKey;
  const idToken = await auth.currentUser?.getIdToken();

  const result = await getRequest({ endpoint: "/event/tags", token: idToken });
  return result.map((tag: { id: string; name: string }) => ({
    value: tag.id,
    label: tag.name,
  }));
};

const getLocations: QueryFunction<
  SelectOption<string>[],
  string[],
  any
> = async () => {
  const idToken = await auth.currentUser?.getIdToken();

  const result = await getRequest({ endpoint: "/space/all", token: idToken });
  return result.map((location: { id: string; name: string }) => ({
    value: location.id,
    label: location.name,
  }));
};

const getProjectUnitGoals: QueryFunction<
  SelectOption<string>[],
  string[],
  any
> = async ({ queryKey }) => {
  const [_, __, searchParam] = queryKey;

  const UNITS = [
    {
      id: "1",
      name: "bags",
    },
    {
      id: "2",
      name: "donated",
    },
    {
      id: "3",
      name: "planted",
    },
    {
      id: "4",
      name: "executed",
    },
  ];

  await new Promise((res: any) => setTimeout(res, 1000));
  return UNITS.map((unit) => ({ value: unit.id, label: unit.name }));
};

const createEvent = async (values: NewEventFields) => {
  const { eventValues, isProject } = values;

  const idToken = await auth.currentUser?.getIdToken();

  const newLocation = await postRequest({
    endpoint: "/space/get-or-create",
    body: {
      ...eventValues.location,
      name: eventValues.location.name.split(",")[0],
    },
    token: idToken,
  });

  const tagList: { id: string; name: string }[] = await postRequest({
    endpoint: "/event/tags/get-or-create/multiple",
    body: { tags: eventValues.tags?.map((tag) => tag.value) ?? [] },
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
    location_id: newLocation.id,
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

export { getServiceCategories, getProjectUnitGoals, createEvent, getTags, getLocations };
