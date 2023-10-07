import { inter } from "@/utils/constants/fonts";
import React from "react";
import { StatusPill } from "..";
import { LocationSVG } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";

interface Props {
  event: ServiceEvent;
}

type EventStatus = "scheduled" | "ongoing" | "completed" | "cancelled";

const EventCard: React.FC<Props> = ({ event }) => {
  const { name, event_start_date_time, event_end_date_time, status, event_location } = event;
  const eventStatus = status.toLowerCase();

  const eventStartDate = new Date(event_start_date_time);
  const eventEndDate = new Date(event_end_date_time);

  return (
    <article
      className={`${inter.className} flex flex-col gap-2 w-96 border-2 border-primary-900 rounded-md p-4`}
    >
      <div className="flex justify-between">
        <p className="font-bold text-lg">
          <span className="font-semibold text-5xl">
            {eventStartDate.getDate()}
          </span>{" "}
          {Intl.DateTimeFormat("en-AU", { month: "short" }).format(
            eventStartDate
          )}
        </p>
        <div>
          <StatusPill status={eventStatus as EventStatus} />
        </div>
      </div>
      <h2 className="font-semibold text-base bg-secondary-200 w-fit">{ name }</h2>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex gap-2 items-center">
          <LocationSVG color={COLORS.gray[600]} dimensions={{ width: 20 }}/>
          <p className="text-gray-600 font-semibold">{event_location.name}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
