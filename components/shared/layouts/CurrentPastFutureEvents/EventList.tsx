import React, { useEffect } from "react";
import { StatusPill, Loader } from "../../elements";
import EventCard from "../../elements/EventList/EventCard";
import {
  getHostedEvent,
  getParticipatedEvent,
} from "@/utils/fetchers/event/discovery";
import { useQuery } from "@tanstack/react-query";
import { type } from "os";
import { AnimatePresence, motion } from "framer-motion";

type CPEType = "hosted" | "registered" | "all";

const fetchers: Record<
  CPEType,
  (choice?: string) => () => Promise<(EventDetail | EventParticipationData)[]>
> = {
  hosted: getHostedEvent,
  registered: getParticipatedEvent,
  all: (choice?: string) => async () => new Promise([] as any),
};

interface Props {
  choice: string[];
  chosenIdx: number;
  type: CPEType;
}

const mapPartToEvent = (
  ev: EventParticipationData | EventDetail
): EventDetail => {
  if ("event" in ev) return ev.event as EventDetail;
  return ev as EventDetail;
};

const EventList: React.FC<Props> = ({ choice, chosenIdx, type }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", type, choice, chosenIdx],
    queryFn: fetchers[type](choice[chosenIdx]),
  });

  const ongoingEvents = data
    ?.filter((event) => mapPartToEvent(event).status === "On Going")
    .map((event) => mapPartToEvent(event));
  const upcomingEvents = data
    ?.filter((event) => mapPartToEvent(event).status === "Scheduled")
    .map((event) => mapPartToEvent(event));
  const pastEvents = data
    ?.filter((event) =>
      ["Completed", "Cancelled"].includes(mapPartToEvent(event).status)
    )
    .map((event) => mapPartToEvent(event));

  return (
    <section id="event-lists" className="flex flex-col md:flex-row gap-5">
      <div className="w-full">
        <div className="w-fit flex items-center mb-4 gap-4">
          <StatusPill status="on going" />
          <p className="font-semibold text-gray-400">
            {ongoingEvents?.length ?? 0}
          </p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="scroll-styled min-h-[278px] flex md:flex-col gap-2 md:h-[650px] overflow-y-scroll">
            <AnimatePresence>
              {ongoingEvents?.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EventCard event={event} key={event.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-fit flex items-center mb-4 gap-4">
          <StatusPill status="upcoming" />
          <p className="font-semibold text-gray-400">
            {upcomingEvents?.length ?? 0}
          </p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="scroll-styled min-h-[278px] flex md:flex-col gap-2 md:h-[650px] overflow-y-scroll">
            <AnimatePresence>
              {upcomingEvents?.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EventCard event={event} key={event.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="w-fit flex items-center mb-4 gap-4">
          <StatusPill status="past" />
          <p className="font-semibold text-gray-400">
            {pastEvents?.length ?? 0}
          </p>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="scroll-styled min-h-[278px] flex md:flex-col gap-2 md:h-[650px] overflow-y-scroll">
            <AnimatePresence>
              {pastEvents?.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EventCard event={event} key={event.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;
