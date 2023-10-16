import { garamond, inter } from "@/utils/constants/fonts";
import React, { useState } from "react";
import cn from "clsx";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import CPEToggler from "./CPEToggler";
import { useQuery } from "@tanstack/react-query";
import {
  getHostedEvent,
  getParticipatedEvent,
} from "@/utils/fetchers/event/discovery";
import { Loader, StatusPill } from "../../elements";
import EventCard from "../../elements/EventList/EventCard";
import EventList from "./EventList";

type CPEType = "hosted" | "registered" | "all";

interface Props {
  type: CPEType;
}
const choices: Record<CPEType, string[]> = {
  hosted: ["initiative", "project"],
  registered: ["volunteer", "participant"],
  all: [],
};

const CurrentPastFutureEvents: React.FC<Props> = ({ type }) => {
  const choice = choices[type];

  const [chosenIdx, setChosenIdx] = useState(0);

  const toggleIdx = (idx: number) => () => setChosenIdx(idx);

  return (
    <div
      className={cn("px-6 md:px-12 pt-10 pb-10 md:pb-0 flex flex-col gap-14", inter.className)}
    >
      <section id="title">
        <h4 className={cn(garamond.className, "italic text-xl")}>My Events</h4>
        <h1 className="text-4xl font-bold">{capitalize(type)} Events</h1>
      </section>
      <section id="event-list-group" className="flex flex-col gap-4">
        <CPEToggler
          choices={choice}
          chosenIdx={chosenIdx}
          toggleIdx={toggleIdx}
        />
        <h2 className="text-2xl font-bold">Events | {type}</h2>
        <EventList choice={choice} chosenIdx={chosenIdx} type={type} />
      </section>
    </div>
  );
};

export default CurrentPastFutureEvents;
