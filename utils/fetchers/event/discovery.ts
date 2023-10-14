import { getRequest } from "@/lib/fetch";

const PAGE_LIMIT = 10;

const EVENT_MAP: Record<keyof EventFilters, string> = {
  type: "type",
  status: "status",
  category: "category_id",
  tag: "tags",
  location: "location_id"
}

const getListOfEvents = (filters: EventFilters, location?: EventLocation) => {
  return async (page: number = 1) => {
    const searchParamValues: Record<string, string> = Object.keys(
      filters
    ).reduce(
      (prev, key) =>
        filters[key as keyof EventFilters] == null
          ? prev
          : {
              ...prev,
              [EVENT_MAP[key as keyof EventFilters]]: filters[key as keyof EventFilters]?.value.toLowerCase(),
            },
      {
        limit: `${PAGE_LIMIT}`,
        page: `${page}`,
      }
    );

    const searchParams = new URLSearchParams(searchParamValues);
    const endpoint = "/event/search"

    const listOfEvents = await getRequest({ endpoint, searchParams });
    return listOfEvents;
  };
};

export { getListOfEvents };
