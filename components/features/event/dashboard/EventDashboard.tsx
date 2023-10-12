import React from "react";
import { useRouter } from "next/router";
import { RoundedCircle, StatusPill } from "@/components/shared/elements";
import { FaArrowLeft } from "react-icons/fa";
import { inter } from "@/utils/constants/fonts";
import EventInfoAndActions from "./EventInfoAndActions";
import EventAnalytics from "./EventAnalytics";
import EventInfoAndActionsEditable from "./editable";
import { useAppContext } from "@/context/AppContext";

interface EventDashboardProps extends React.PropsWithChildren {
  eventDetails: EventDetail;
}

const EventDashboard = (props: EventDashboardProps) => {
  const { user } = useAppContext();
  const { eventDetails } = props;
  const router = useRouter();
  const isCreator = user?.uid === eventDetails.event_creator_id;

  return (
    <div className={`lg:pt-24 lg:p-10 p-6 ${inter.className}`}>
      <section className="flex justify-between items-center">
        <RoundedCircle>
          <button
            onClick={() => router.push("/event/discover")}
            className="lg:text-base md:text-base text-xs"
          >
            <FaArrowLeft />
          </button>
        </RoundedCircle>
        <StatusPill
          // @ts-expect-error
          status={eventDetails.status.toLowerCase()}
        />
      </section>
      {isCreator ? (
        <EventInfoAndActionsEditable eventDetails={eventDetails} />
      ) : (
        <EventInfoAndActions eventDetails={eventDetails} />
      )}
      <EventAnalytics eventDetails={eventDetails} />
    </div>
  );
};

export default EventDashboard;
