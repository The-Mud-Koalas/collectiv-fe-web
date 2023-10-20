import { getRequest } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";

export function useAnalytics({ eventDetails }: { eventDetails: EventDetail }) {
  const analytics = useQuery({
    queryKey: ["forum-analytics", eventDetails.id],
    queryFn: async () => {
      const forumAnalytics = (await getRequest({
        endpoint: `/forums/${eventDetails.id}/analytics`,
      })) as ForumAnalytics;
      return forumAnalytics;
    },
  });

  return analytics;
}
