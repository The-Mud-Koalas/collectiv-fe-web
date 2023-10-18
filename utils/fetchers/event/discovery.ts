import { getRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";

const PAGE_LIMIT = 6;

const EVENT_MAP: Record<keyof EventFilters, string> = {
    type: "type",
    status: "status",
    category: "category_id",
    tag: "tags",
    location: "location_id",
};

const getListOfEvents = (
    filters: EventFilters | LocationFilters,
    location?: EventLocation
) => {
    const searchFilters: EventFilters =
        "location" in filters
            ? (filters as EventFilters)
            : ({
                  ...filters,
                  location: { value: location?.id, label: location?.name },
              } as EventFilters);
    return async (page: number = 1) => {
        const searchParamValues: Record<string, string> = Object.keys(
            searchFilters
        ).reduce(
            (prev, key) =>
                searchFilters[key as keyof EventFilters] == null
                    ? prev
                    : {
                          ...prev,
                          [EVENT_MAP[key as keyof EventFilters]]:
                              searchFilters[
                                  key as keyof EventFilters
                              ]?.value.toLowerCase(),
                      },
            {
                limit: `${PAGE_LIMIT}`,
                page: `${page}`,
            }
        );

        

        const searchParams = new URLSearchParams(searchParamValues);
        const endpoint = "/event/search";

        const listOfEvents = await getRequest({ endpoint, searchParams });
        return listOfEvents;
    };
};

const getListOfEventsHost = (
    filters: EventFilters | LocationFilters,
    location?: EventLocation
) => {
    const searchFilters: EventFilters =
        "location" in filters
            ? (filters as EventFilters)
            : ({
                  ...filters,
                  location: { value: location?.id, label: location?.name },
              } as EventFilters);
    return async (page: number = 1, limit: number) => {
        const searchParamValues: Record<string, string> = Object.keys(
            searchFilters
        ).reduce(
            (prev, key) =>
                searchFilters[key as keyof EventFilters] == null
                    ? prev
                    : {
                          ...prev,
                          [EVENT_MAP[key as keyof EventFilters]]:
                              searchFilters[
                                  key as keyof EventFilters
                              ]?.value.toLowerCase(),
                      },
            {
                limit: `${limit}`,
                page: `${page}`,
            }
        );

        

        const searchParams = new URLSearchParams(searchParamValues);
        const endpoint = "/event/search";

        const listOfEvents = await getRequest({ endpoint, searchParams });
        return listOfEvents;
    };
};

const getHostedEvent = (choice?: string) => async () => {
    const searchParams =
        choice != null && new URLSearchParams({ type: choice });
    const token = await auth.currentUser?.getIdToken();

    const endpoint = "/participation/creator/view";
    const getRequestProps = searchParams
        ? { endpoint, searchParams, token }
        : { endpoint, token };

    const listOfHostedEvents = await getRequest(getRequestProps);
    return listOfHostedEvents as EventDetail[];
};

const getParticipatedEvent = (choice?: string) => async () => {
    const searchParams =
        choice != null && new URLSearchParams({ type: choice });
    const token = await auth.currentUser?.getIdToken();

    const endpoint = "/participation/participant/view";
    const getRequestProps = searchParams
        ? { endpoint, searchParams, token }
        : { endpoint, token };

    const listOfParticipatedEvents = await getRequest(getRequestProps);
    return listOfParticipatedEvents as EventParticipationData[];
};

export { getListOfEventsHost, getListOfEvents, getHostedEvent, getParticipatedEvent };
