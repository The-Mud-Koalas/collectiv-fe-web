import { Button } from "@/components/shared/elements";
import { EventList } from "@/components/shared/elements/EventList";
import { Filter } from "@/components/shared/elements/Filter";
import { Arrow } from "@/components/shared/svg/icons";
import CollectivLogo from "@/components/shared/svg/logo/CollectivLogo";
import { COLORS } from "@/utils/constants/colors";
import { garamond, inter, interItalics } from "@/utils/constants/fonts";
import { getListOfEvents } from "@/utils/fetchers/event/discovery";
import Link from "next/link";
import React, { useEffect } from "react";

type FilterOptions = {
  [Property in keyof EventFilters]: SelectOption<string>[];
};

interface Props {
  changeFilterParam: (
    key: keyof EventFilters
  ) => (value: SelectOption<string> | null) => void;
  filters: EventFilters;
  options: FilterOptions;
}

const DiscoverEvents: React.FC<Props> = ({
  filters,
  changeFilterParam,
  options,
}) => {
  return (
    <div className="flex flex-col items-center">
      <section
        id="join-circle"
        className="py-10 w-1/2 flex flex-col items-center justify-center gap-4"
      >
        <h4 className={`${garamond.className} text-center font-bold italic text-xl`}>
          Events
        </h4>
        <h1
          className={`${inter.className}  text-center text-primary-800 text-4xl sm:text-6xl font-bold`}
        >
          Join the Circle
        </h1>
        <p
          className={`${inter.className} text-base sm:text-lg font-medium text-center text-primary-800`}
        >
          Don&apos;t just watch from the sidelines – dive in! Register and
          immerse yourself in a community that&apos;s brimming with
          opportunities for{" "}
          <span className="bg-secondary-200">
            engagement, enrichment, and enjoyment.
          </span>
        </p>
        <Link href="#events-in">
          <Button
            tabIndex={-1}
            className="bg-primary-800 text-primary-300 px-5 py-2 flex gap-3 rounded-full items-center"
          >
            <p className={`${inter.className} text-primary-300 font-medium`}>
              View Events
            </p>
            <div className="rotate-90">
              <Arrow dimensions={{ width: 20 }} color={COLORS.primary[300]} />
            </div>
          </Button>
        </Link>
      </section>
      <section id="health">{/* Rashad's Health Part */}</section>
      <section id="events-in" className="w-full px-10 flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-2">
          <h2 className={`${garamond.className} text-3xl italic`}>
            Events in <span className="font-bold">Collectiv</span>
          </h2>
          <CollectivLogo color="black" dimensions={{ width: 27 }} />
        </div>
        <div className=" sm:flex gap-3 items-center">
          <p className={`${interItalics.className} mb-2 sm:mb-0 font-medium text-base`}>
            Filter by
          </p>
          <div className="flex gap-2 sm:gap-3 max-w-sreen flex-wrap">
            {Object.keys(filters).map((filter) => (
              <Filter
                key={filter}
                filterOptions={options[filter as keyof FilterOptions]}
                filterName={filter}
                onChange={changeFilterParam(filter as keyof EventFilters)}
              />
            ))}
          </div>
        </div>
      </section>
      <EventList fetchType="event" filters={filters} />
    </div>
  );
};

export default DiscoverEvents;
