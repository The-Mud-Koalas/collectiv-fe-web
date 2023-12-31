import { FC, useEffect, useState } from "react";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { useQuery } from "@tanstack/react-query";
import {
    getLocations,
    getSubscribedLocations,
} from "@/utils/fetchers/event/creation";
import LocationEntry from "./LocationEntry";
import { Loading } from "@/components/shared/layouts";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";

interface LocationListProps {}

const LocationList: FC<LocationListProps> = ({}) => {
    const {
        data: locations,
        isLoading: isLocationsLoading,
        isError: isLocationsError,
        error: locationsError,
    } = useQuery({
        queryKey: ["locations"],
        queryFn: getLocations,
    });

    const {
        data: subscribedLocations,
        isLoading: isSubscribedLocationsLoading,
        isError: isSubscribedLocationsError,
        error: subscribedlocationsError,
    } = useQuery({
        queryKey: ["locations-subscribed"],
        queryFn: getSubscribedLocations,
    });

    const isSubscribed = (location: EventLocation) => {
        if (subscribedLocations) {
            return subscribedLocations.some(
                (subscribedLocation) => subscribedLocation.id === location.id
            );
        }
        return false;
    };

    const isLoading = isSubscribedLocationsLoading || isLocationsLoading;
    const isError = isSubscribedLocationsError || isLocationsError;
    const error = subscribedlocationsError || locationsError;

    if (isLoading) return <Loading />;

    return (
        <div className="text-center my-20 md:my-40">
            <span className="w-10 h-10 bg-secondary-200 rounded-full p-4 flex items-center justify-center mx-auto mb-5">
                ❇️
            </span>
            <h1
                className={cn(
                    " text-3xl md:text-5xl font-bold",
                    inter.className
                )}
            >
                Check our Locations
            </h1>
            <div className="flex flex-col max-w-[921px] mx-auto my-10">
                {locations ? (
                    locations.map((location: EventLocation) => (
                        <LocationEntry
                            key={location.id}
                            {...location}
                            isSubscribed={isSubscribed(location)}
                        />
                    ))
                ) : (
                    // You can add a loading or placeholder message here
                    <p>Loading locations...</p>
                )}
            </div>
        </div>
    );
};

export default LocationList;
