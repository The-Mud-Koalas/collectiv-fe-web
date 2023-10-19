import React from "react";
import { StatusPill } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import EventInfoAndActions from "./EventInfoAndActions";
import EventAnalytics from "./EventAnalytics";
import EventInfoAndActionsEditable from "./editable";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetch";
import { Loading } from "@/components/shared/layouts";
import { getParticipation } from "@/utils/fetchers/event/participation";
import cn from "clsx";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { BsPersonFill } from "react-icons/bs";

interface EventDashboardProps extends React.PropsWithChildren {
  eventDetails: EventDetail;
}

const EventDashboard = (props: EventDashboardProps) => {
  const { user } = useAppContext();
  const {
    data: eventDetails,
    isFetching,
    isLoading,
    isError,
  } = useQuery(["event-details", props.eventDetails.id], {
    queryFn: async () => {
      const event = (await getRequest({
        endpoint: `/event/detail/${props.eventDetails.id}`,
      })) as EventDetail;

      return event;
    },
    initialData: props.eventDetails,
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  });

  const analytics = useQuery({
    queryKey: ["event-analytics", eventDetails.id],
    queryFn: async () => {
      const data = await getRequest({
        endpoint: `/analytics/event/${eventDetails.id}`,
      });
      return data as EventAnalytics;
    },
  });

  const participation = useQuery({
    queryKey: ["participation", user?.uid, eventDetails.id],
    queryFn: getParticipation(user, eventDetails.id),
    enabled: !!user?.uid,
  });

  const isCreator = user?.uid === eventDetails.event_creator_id;

  if (isLoading || analytics.isLoading) return <Loading />;
  if (isError || analytics.isError) return <></>;

  return (
    <div className={`lg:pt-24 lg:p-10 p-6 ${inter.className}`}>
      <section className="flex justify-between items-center">
        <StatusPill
          // @ts-expect-error
          status={eventDetails.status.toLowerCase()}
        />
        {participation.data?.is_registered && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl py-[3px] px-2 text-sm font-semibold",
              inter.className,
              "bg-secondary-300 text-secondary-500"
            )}
          >
            <BsPersonFill />
            <span>{capitalize(participation.data.data.type)}</span>
          </div>
        )}
      </section>
      {isCreator ? (
        <EventInfoAndActionsEditable
          eventDetails={eventDetails}
          isFetching={isFetching}
          analytics={analytics}
        />
      ) : (
        <EventInfoAndActions
          participation={participation}
          eventDetails={eventDetails}
          analytics={analytics}
        />
      )}
      <EventAnalytics analytics={analytics} eventId={eventDetails.id} />
    </div>
  );
};

export default EventDashboard;
