import { useAppContext } from "@/context/AppContext";
import { getRequest } from "@/lib/fetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  eventDetails: EventDetail;
  postsAfterDate?: Date;
  refetchInterval?: number;
  fetchLimit?: number;
}

export function useNewPosts({
  eventDetails,
  postsAfterDate = new Date(),
  refetchInterval = 1000 * 60 * 10,
  fetchLimit = 10,
}: Props) {
  const { user } = useAppContext();
  const [isPaused, setIsPaused] = useState(false);
  const posts = useQuery({
    queryKey: ["new-posts", eventDetails.id],
    queryFn: async () => {
      if (!user) return [] as ForumPost[];
      const token = await user.getIdToken();
      const params = new URLSearchParams({
        after: postsAfterDate.toISOString(),
      });
      let response = (await getRequest({
        endpoint: `/forums/${eventDetails.id}/list/range`,
        searchParams: params,
        token,
      })) as ForumPost[];

      return response;
    },
    refetchInterval,
    enabled: !isPaused,
  });

  const revalidate = async (postId: string) => {
    await posts.refetch();
  };

  return {
    posts: posts.data ?? [],
    isFetching: posts.isFetching,
    pause: () => {
      if (!isPaused) setIsPaused(true);
    },
    unpause: () => {
      if (isPaused) setIsPaused(false);
    },
    revalidate,
  };
}
