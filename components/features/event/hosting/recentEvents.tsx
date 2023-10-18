import { FC, useEffect, useMemo } from "react";
import { garamond, inter } from "@/utils/constants/fonts";
import { GoogleMap } from "@react-google-maps/api";
import LocationMapPin from "../../location/LocationMap/LocationMapPin";
import EventHostingCard from "./EventHostingCard";
import RecentEventMap from "@/components/shared/images/RecentEventMap.png";
import Image from "next/image";
import { getListOfEvents } from "@/utils/fetchers/event/discovery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showErrorToast } from "@/lib/toast";

interface recentEventsProps {}
interface EventFilters {
    status: SelectOption<string> | null;
    type: SelectOption<string> | null;
    category: SelectOption<string> | null;
    tag: SelectOption<string> | null;
    location: SelectOption<string> | null;
}

const recentEvents: FC<recentEventsProps> = ({}) => {
    const PAGE_LIMIT = 3;
    const filters: EventFilters = {
        type: null,
        status: null,
        category: null,
        tag: null,
        location: null,
    };

    const { data, isLoading, isError, error, isPreviousData } = useQuery<
        PaginatedResults<EventDetail[]>
    >({
        queryFn: () => getListOfEvents(filters)(PAGE_LIMIT),
        keepPreviousData: true,
    });

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div className="flex flex-wrap justify-left gap-10 items-center rounded-3xl bg-secondary-200 py-10">
            <Image
                src={RecentEventMap}
                width="739"
                alt={"map with recent events pinned"}
            />
            <div className="px-5 mx-auto">
                <h1 className={`${garamond.className} text-5xl italic`}>
                    Previous Events Hosted
                </h1>
                {data
                    ? data.results.map((eventItem: any, index: number) => (
                          <EventHostingCard
                              key={eventItem.id}
                              number={index + 1}
                              locationName={eventItem.name}
                              locationComment={eventItem.description}
                          />
                      ))
                    : "loading"}
            </div>
        </div>
    );
};

export default recentEvents;
