import RecentEventMap from "@/components/shared/images/RecentEventMap.png";
import { Loading } from "@/components/shared/layouts";
import { garamond } from "@/utils/constants/fonts";
import { getListOfEventsHost } from "@/utils/fetchers/event/discovery";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";
import EventHostingCard from "./EventHostingCard";

interface recentEventsProps {}
interface EventFilters {
    status: SelectOption<string> | null;
    type: SelectOption<string> | null;
    category: SelectOption<string> | null;
    tag: SelectOption<string> | null;
    location: SelectOption<string> | null;
}

const RecentEvents: FC<recentEventsProps> = ({}) => {
    const max_events_shown = 3;
    const filters: EventFilters = {
        type: null,
        status: null,
        category: null,
        tag: null,
        location: null,
    };

    const { data, isLoading, isError, error } = useQuery<
        PaginatedResults<EventDetail[]>
    >({
        queryFn: () => getListOfEventsHost(filters)(3, max_events_shown),
        keepPreviousData: true,
    });

    if (isLoading) return <Loading />;
    if (isError) return <></>;

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
                {data &&
                    data.results.map((eventItem: any, index: number) => (
                        <EventHostingCard
                            key={eventItem.id}
                            number={index + 1}
                            locationName={eventItem.name}
                            locationComment={eventItem.description}
                        />
                    ))}
            </div>
        </div>
    );
};

export default RecentEvents;
