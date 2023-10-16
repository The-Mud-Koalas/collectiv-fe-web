import { inter } from "@/utils/constants/fonts";
import React from "react";
import { Button, StatusPill } from "..";
import { Arrow, Clock, LocationSVG, People } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { occurInSameDate } from "@/utils/helpers/others/dates";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowSize } from "@/hooks/display";
import { BREAKPOINTS } from "@/utils/constants/breakpoints";

interface Props {
  event: EventDetail;
}

type EventStatus = "scheduled" | "on going" | "completed" | "cancelled";

const EventCard: React.FC<Props> = ({ event }) => {
  const {
    name,
    event_start_date_time,
    event_end_date_time,
    status,
    event_location,
    current_num_of_participants,
    id,
  } = event;
  const eventStatus = status.toLowerCase();
  const router = useRouter();

  const eventStartDate = new Date(event_start_date_time);
  const eventEndDate = new Date(event_end_date_time);
  const isInSameDate = occurInSameDate(eventStartDate, eventEndDate);
  const { windowWidth } = useWindowSize();

  return (
    <article
      className={`${inter.className} flex flex-col gap-2 w-full md:w-96 border-2 border-primary-900 rounded-md p-4`}
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
      <h2 className="font-semibold text-base bg-secondary-200 w-fit">{name}</h2>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex gap-2 items-center">
          <Clock color={COLORS.gray[600]} dimensions={{ width: 20 }} />
          <p className="text-gray-600 font-semibold">
            {Intl.DateTimeFormat("en-AU", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
              .format(eventStartDate)
              .toUpperCase()}{" "}
            -{" "}
            {Intl.DateTimeFormat("en-AU", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              day: isInSameDate ? undefined : "numeric",
              month: isInSameDate ? undefined : "short",
            })
              .format(eventEndDate)
              .replace(",", "")
              .replace("pm", "PM")}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <LocationSVG color={COLORS.gray[600]} dimensions={{ width: 20 }} />
          <p className="text-gray-600 font-semibold">{event_location.name}</p>
        </div>
        <div className="flex gap-2 items-center">
          <People color={COLORS.gray[600]} dimensions={{ width: 20 }} />
          <p className="text-gray-600 font-semibold">
            {current_num_of_participants >= 40
              ? "40"
              : current_num_of_participants}{" "}
            user{current_num_of_participants > 1 && "s"} have registered
          </p>
        </div>
        <div className="flex gap-2 items-center self-center">
          <Link
            href={`/event/${id}/forum`}
            className="border-2 border-primary-800 flex gap-3 py-2 px-2 sm:px-4 rounded-full"
          >
            <p className="medium text-sm sm:text-base text-primary-800">View Forums</p>
            <div className="-rotate-45">
              <Arrow color={COLORS.primary[800]} dimensions={{ width: windowWidth >= BREAKPOINTS.sm ? 25 : 20 }} />
            </div>
          </Link>
          <Link
            href={`/event/${id}`}
            className="bg-primary-800 py-2 px-4 rounded-full medium text-base text-primary-300"
          >
            Check Events
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
