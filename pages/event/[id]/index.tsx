import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Template } from "@/components/shared/layouts";
import EventDashboard from "@/components/features/event/dashboard";
import { getRequest } from "@/lib/fetch";

export const getServerSideProps = (async (context) => {
  const eventId = context.query.id as string;
  try {
    const event = await getRequest({ endpoint: `/event/detail/${eventId}` }) as EventDetail;
    return { props: { event } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{ event: EventDetail }>;

const EventViewDetailsPage = ({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Template>
      <EventDashboard eventDetails={event} />
    </Template>
  );
};

export default EventViewDetailsPage;
