import { Button } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import React from "react";
import cn from "clsx";
import { garamond, inter, interItalics } from "@/utils/constants/fonts";
import { LocationMap } from "./LocationMap";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getSubscribedLocations } from "@/utils/fetchers/event/creation";
import { Loading } from "@/components/shared/layouts";
import { Filter } from "@/components/shared/elements/Filter";
import SubscribeToggle from "./SubscribeToggle";
import { EventList } from "@/components/shared/elements/EventList";

const desc = `The centrepiece of the Great Court, the Forgan Smith building, was the first to be constructed when the University relocated from Old Government House to St Lucia. The foundation stone was laid by Queensland Premier the Hon William Forgan Smith on 6 March 1937, with construction beginning the following year.`;

type LocationFilters = Omit<EventFilters, "location">;
type FilterOptions = {
  [Property in keyof LocationFilters]: SelectOption<string>[];
};

interface Props {
  locationDetails: EventLocation;

  changeFilterParam: (
    key: keyof LocationFilters
  ) => (value: SelectOption<string> | null) => void;
  filters: LocationFilters;
  options: FilterOptions;
}

const LocationDetails: React.FC<Props> = ({
  locationDetails,
  filters,
  options,
  changeFilterParam,
}) => {
  const {
    data: subscribedLocations,
    isLoading: isSubscribedLocationsLoading,
    isError: isSubscribedLocationsError,
    error: subscribedlocationsError,
  } = useQuery({
    queryKey: ["locations-subscribed"],
    queryFn: getSubscribedLocations,
  });

  const router = useRouter();

  const locationId = router.query.id;

  if (isSubscribedLocationsLoading) return <Loading />;
  if (isSubscribedLocationsError) return <></>;

  const subscribedToLocation = subscribedLocations.some(
    (loc) => loc.id === locationId
  );

  return (
    <div className={cn("px-2 md:px-10 py-12", inter.className)}>
      <section
        id="detail"
        className="flex flex-col-reverse lg:flex-row py-10 w-full relative rounded-lg bg-primary-200 lg:gap-0 gap-6"
      >
        <Button onClick={() => router.back()} className="absolute left-4 top-2">
          <Back color={COLORS.primary[800]} dimensions={{ width: 30 }} />
        </Button>
        <LocationMap {...locationDetails} />
        <div className="w-full flex flex-col gap-4 px-10 lg:gap-10">
          <h1 className="font-semibold text-4xl sm:text-7xl">
            {locationDetails.name}
          </h1>
          <p className="font-medium text-base text-primary-800">{desc}</p>
          <SubscribeToggle isSubscribed={subscribedToLocation} />
        </div>
      </section>
      <section id="analytics">
        <h1 className={cn(garamond.className, "text-4xl")}>About the Space</h1>
        {/* Rashad do your analytics here */}
      </section>
      <section id="filter" className="mt-4">
        <h4 className={cn(garamond.className, "italic text-2xl sm:text-5xl mb-2")}>Activites in {locationDetails.name}</h4>
        <div className="flex gap-2 sm:gap-3 max-w-sreen flex-wrap">
          {Object.keys(filters).map((filter) => (
            <Filter
              key={filter}
              filterOptions={options[filter as keyof FilterOptions]}
              filterName={filter}
              onChange={changeFilterParam(filter as keyof LocationFilters)}
            />
          ))}
        </div>
        <EventList fetchType="location" filters={filters as LocationFilters} location={locationDetails}/>
      </section>
    </div>
  );
};

export default LocationDetails;
