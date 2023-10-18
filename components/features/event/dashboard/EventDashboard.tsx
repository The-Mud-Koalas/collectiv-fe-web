import React from "react";
import { useRouter } from "next/router";
import { RoundedCircle, StatusPill } from "@/components/shared/elements";
import { FaArrowLeft } from "react-icons/fa";
import { inter } from "@/utils/constants/fonts";
import EventInfoAndActions from "./EventInfoAndActions";
import EventAnalytics from "./EventAnalytics";
import EventInfoAndActionsEditable from "./editable";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetch";
import { Loading } from "@/components/shared/layouts";

interface EventDashboardProps extends React.PropsWithChildren {
  eventDetails: EventDetail;
}

const EventDashboard = (props: EventDashboardProps) => {
  const { user } = useAppContext();
  const { data: eventDetails, isFetching, isLoading, isError } = useQuery(
    ["event-details", props.eventDetails.id],
    {
      queryFn: async () => {
        const event = (await getRequest({
          endpoint: `/event/detail/${props.eventDetails.id}`,
        })) as EventDetail;

        return event;
      },
      initialData: props.eventDetails,
      staleTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    }
  );

  const analytics = useQuery({
    queryKey: ["event-analytics", eventDetails.id],
    queryFn: async () => {
      const data = await getRequest({
        endpoint: `/analytics/event/${eventDetails.id}`,
      });
      return data as EventAnalytics;
    },
  });


  const router = useRouter();
  const isCreator = user?.uid === eventDetails.event_creator_id;

  if (isLoading || analytics.isLoading) return <Loading/>;
  if (isError || analytics.isError) return <></>

  return (
    <div className={`lg:pt-24 lg:p-10 p-6 ${inter.className}`}>
      <section className="flex justify-between items-center">
        <StatusPill
          // @ts-expect-error
          status={eventDetails.status.toLowerCase()}
        />
      </section>
      {isCreator ? (
        <EventInfoAndActionsEditable
          eventDetails={eventDetails}
          isFetching={isFetching}
          analytics={analytics}
        />
      ) : (
        <EventInfoAndActions eventDetails={eventDetails} analytics={analytics}/>
      )}
      <EventAnalytics analytics={analytics} eventId={eventDetails.id} />
    </div>
  );
};

export default EventDashboard;
