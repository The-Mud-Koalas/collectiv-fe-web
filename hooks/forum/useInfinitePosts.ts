import { useAppContext } from "@/context/AppContext";
import { getRequest } from "@/lib/fetch";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

interface Props {
  eventDetails: EventDetail;
  postsBeforeDate?: Date;
  fetchLimit?: number;
}

export function useInfinitePosts({
  eventDetails,
  postsBeforeDate = new Date(),
  fetchLimit = 10,
}: Props) {
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const [isExhausted, setIsExhausted] = useState(false);
  const oldestPostDate = useRef(postsBeforeDate);
  const posts = useInfiniteQuery({
    queryKey: ["old-posts", eventDetails.id],
    queryFn: async ({ pageParam = postsBeforeDate }) => {
      if (!user) return [] as ForumPost[];
      const token = await user.getIdToken();
      const params = new URLSearchParams({
        before: pageParam.toISOString(),
        limit: fetchLimit.toString(),
      });
      let response = (await getRequest({
        endpoint: `/forums/${eventDetails.id}/list/range`,
        searchParams: params,
        token,
      })) as ForumPost[];

      if (response.length === 0) {
        setIsExhausted(true);
      }

      return response;
    },
    getNextPageParam: (_, pages) => {
      const lastPage = pages.findLast((page) => page.length > 0)!;
      if (!lastPage) return;
      const oldestPost = lastPage[lastPage.length - 1];
      oldestPostDate.current = new Date(oldestPost.posted_at);
      return oldestPostDate.current;
    },
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 30,
  });

  const flatPosts = posts.data?.pages.flat() ?? [];

  const revalidate = async (postId: string) => {
    await queryClient.invalidateQueries({
      queryKey: ["old-posts", eventDetails.id],
      refetchPage: (_, index, pages) => {
        const posts = pages[index] as ForumPost[];
        return !!posts.find((post) => post.id === postId);
      },
    });
  };

  return {
    posts: flatPosts,
    isFetching: posts.isFetching,
    isFetchingNextPage: posts.isFetchingNextPage,
    getMorePosts: posts.fetchNextPage,
    isExhausted,
    revalidate,
  };
}
