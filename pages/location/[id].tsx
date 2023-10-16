import LocationDetails from "@/components/features/location/LocationDetails";
import { Loading, Template } from "@/components/shared/layouts";
import { getTags, getServiceCategories } from "@/utils/fetchers/event/creation";
import { getLocationById } from "@/utils/fetchers/location";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState } from "react";

type LocationFilters = Omit<EventFilters, "location">;

type FilterOptions = {
  [Property in keyof LocationFilters]: SelectOption<string>[];
};

export const getServerSideProps = (async (context) => {
  try {
    const locationId = context.params?.id as string;
    const currentLocation: EventLocation = await getLocationById(locationId);
    return { props: { currentLocation } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{ currentLocation: EventLocation }>;

const SpecificLocationPage = ({
  currentLocation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filters, setFilters] = useState<LocationFilters>({
    status: null,
    type: null,
    category: null,
    tag: null,
  });

  const changeFilterParam =
    (key: keyof LocationFilters) => (value: SelectOption<string> | null) =>
      setFilters((prev) => ({ ...prev, [key]: value }));

  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError,
    error: tagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getServiceCategories,
    staleTime: Infinity,
  });

  if (isTagsLoading || isCategoriesLoading) return <Loading />;
  if (isTagsError || isCategoriesError) return <></>

  const options: FilterOptions = {
    category:
      categories?.map((cat) => ({
        label: capitalize(cat.name, true),
        value: cat.id,
      })) ?? [],
    status: [
      { label: "Scheduled", value: "Scheduled" },
      { label: "Cancelled", value: "Cancelled" },
      { label: "Ongoing", value: "On going" },
      { label: "Completed", value: "Completed" },
    ],
    tag: tags?.map((tag) => ({ label: tag.name, value: tag.name })) ?? [],
    type: [
      { label: "Project", value: "Project" },
      { label: "Initiative", value: "Initiative" },
    ],
  };
  return (
    <Template>
      <LocationDetails filters={filters} locationDetails={currentLocation} changeFilterParam={changeFilterParam} options={options}/>
    </Template>
  );
};

export default SpecificLocationPage;
