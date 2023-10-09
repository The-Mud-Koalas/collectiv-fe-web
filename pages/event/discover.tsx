import { DiscoverEvents } from "@/components/features/event/discovery";
import { Template } from "@/components/shared/layouts";
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

  const changeFilterParam = (
    key: keyof EventFilters
  ) => (value: SelectOption<string> | null) => setFilters((prev) => ({ ...prev, [key]: value }));

  const options: FilterOptions = {
    category: [],
    location: [],
    status: [{ label: "Scheduled", value: "Scheduled"}, { label: "Cancelled", value: "Cancelled" }, { label: "Ongoing", value: "Ongoing" }, { label: "Completed", value: "Completed"}],
    tag: [],
    type: [],
  };
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

DiscoverPage.auth = true;

export default DiscoverPage;
