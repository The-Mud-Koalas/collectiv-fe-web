import React from "react";
import { Template } from "@/components/shared/layouts";
import Forum from "@/components/features/event/forum";
import { getRequest } from "@/lib/fetch";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getParticipation } from "@/utils/fetchers/event/participation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const getServerSideProps = (async (context) => {
  const eventId = context.query.id as string;
  try {
    const event = (await getRequest({
      endpoint: `/event/detail/${eventId}`,
    })) as EventDetail;
    return { props: { event } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{ event: EventDetail }>;

const EventForumsPage = ({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAppContext();
  const router = useRouter();

  const participation = useQuery({
    queryKey: ["participation", user?.uid, event.id],
    queryFn: getParticipation(user, event.id),
    enabled: !!user?.uid,
  });

  if (event.event_creator_id !== user!.uid) {
    if (!participation.data) {
      return null;
    }

    const participationData = participation.data;

    if (!participationData.is_registered) {
      toast.error(
        "In order to access this forum, you have to register to event with id " +
          event.id
      );
      router.replace(`/event/${event.id}`);
      return null;
    }

    if (
      participationData.is_registered &&
      participationData.data.has_left_forum
    ) {
      toast.error(
        "You do not have access to this page since you have left the event/forum."
      );
      router.replace(`/event/${event.id}`);
      return null;
    }
  }

  return (
    <Template>
      <Forum eventDetails={event} />
    </Template>
  );
};
EventForumsPage.auth = true;
export default EventForumsPage;
