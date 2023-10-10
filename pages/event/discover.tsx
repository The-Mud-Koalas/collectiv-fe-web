import { DiscoverEvents } from "@/components/features/event/discovery";
import { Loading, Template } from "@/components/shared/layouts";
import { getLocations, getServiceCategories, getTags } from "@/utils/fetchers/event/creation";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type FilterOptions = {
  [Property in keyof EventFilters]: SelectOption<string>[];
};

const DiscoverPage = () => {
  const [filters, setFilters] = useState<EventFilters>({
    status: null,
    type: null,
    category: null,
    tag: null,
    location: null,
  });

  const changeFilterParam =
    (key: keyof EventFilters) => (value: SelectOption<string> | null) =>
      setFilters((prev) => ({ ...prev, [key]: value }));

  const { data: tags, isLoading: isTagsLoading, isError: isTagsError, error: tagsError } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags
  });

  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError} = useQuery({
    queryKey: ["categories"],
    queryFn: getServiceCategories,
    staleTime: Infinity
  });

  const { data: locations, isLoading: isLocationsLoading, isError: isLocationsError, error: locationsError} = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations
  })

  const isLoading = isCategoriesLoading || isTagsLoading || isLocationsLoading;
  const isError = isCategoriesError || isTagsError || isLocationsError;
  const error = categoriesError || tagsError || locationsError;


  const options: FilterOptions = {
    category: categories ?? [],
    location: locations ?? [],
    status: [
      { label: "Scheduled", value: "Scheduled" },
      { label: "Cancelled", value: "Cancelled" },
      { label: "Ongoing", value: "On going" },
      { label: "Completed", value: "Completed" },
    ],
    tag: tags ?? [],
    type: [
      { label: "Project", value: "Project" },
      { label: "Initiative", value: "Initiative" },
    ],
  };

  if (isLoading) return <Loading/>;

  return (
    <Template>
      <DiscoverEvents
        options={options}
        filters={filters}
        changeFilterParam={changeFilterParam}
      />
    </Template>
  );
};

DiscoverPage.auth = false;

export default DiscoverPage;
