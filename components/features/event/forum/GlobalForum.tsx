import { useAppContext } from "@/context/AppContext";
import { getRequest } from "@/lib/fetch";
import { COLORS } from "@/utils/constants/colors";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { BeatLoader } from "react-spinners";
import cn from "clsx";
import { garamond, inter } from "@/utils/constants/fonts";
import Link from "next/link";
import GlobalForumPost from "./GlobalForumPost";
import WordCloud from "./WordCloud";

function removeAndMergeDuplicates(entities: NamedEntity[]) {
  const duplicateTracker: Record<string, number> = {};
  const duplicatesRemoved: NamedEntity[] = [];
  for (let entity of entities) {
    if (duplicateTracker[entity.word]) {
      duplicateTracker[entity.word] += entity.count;
    } else {
      duplicateTracker[entity.word] = entity.count;
    }
  }

  for (let [word, count] of Object.entries(duplicateTracker)) {
    duplicatesRemoved.push({ word, count });
  }

  return duplicatesRemoved;
}

const GlobalForum = () => {
  const { user } = useAppContext();

  const trendingPosts = useQuery({
    queryKey: ["trending-posts"],
    queryFn: async () => {
      const params = new URLSearchParams({ threshold: "20" });
      const posts = await getRequest({
        endpoint: "/forums/global",
        searchParams: params,
      });
      return posts as GlobalForum;
    },
    staleTime: 1000 * 60 * 30,
  });

  const noPosts = trendingPosts.data && trendingPosts.data.length == 0;
  const posts = useMemo(
    () =>
      trendingPosts.data
        ?.map((forum) =>
          forum.forum_trending_posts.map((post) => ({
            event_id: forum.event_id,
            event_location_id: forum.event_location_id,
            event_location_name: forum.event_location_name,
            event_name: forum.event_name,
            ...post,
          }))
        )
        .flat(),
    [trendingPosts.data]
  );

  const jointTopWords = useMemo(() => {
    const topWordsLOC = trendingPosts.data
      ?.map((forum) => forum.forum_top_words.LOC ?? [])
      .flat();
    const topWordsPER = trendingPosts.data
      ?.map((forum) => forum.forum_top_words.PER ?? [])
      .flat();
    const topWordsMISC = trendingPosts.data
      ?.map((forum) => forum.forum_top_words.MISC ?? [])
      .flat();
    const topWordsORG = trendingPosts.data
      ?.map((forum) => forum.forum_top_words.ORG ?? [])
      .flat();

    const top3LOC = removeAndMergeDuplicates(topWordsLOC ?? []).sort((a, b) => b.count - a.count).slice(0, 3);
    const top3MISC = removeAndMergeDuplicates(topWordsMISC ?? []).sort((a, b) => b.count - a.count).slice(0, 3);
    const top3PER= removeAndMergeDuplicates(topWordsPER ?? []).sort((a, b) => b.count - a.count).slice(0, 3);
    const top3ORG = removeAndMergeDuplicates(topWordsORG ?? []).sort((a, b) => b.count - a.count).slice(0, 3);

    return {
      LOC: top3LOC,
      MISC: top3MISC,
      PER: top3PER,
      ORG: top3ORG,
    } as ForumTopWords;
  }, [trendingPosts.data]);

  const visiblePosts = posts;

  return (
    <div className="flex flex-col items-center gap-4 lg:p-16 p-6 min-h-screen">
      <h1
        className={cn(
          garamond.className,
          "italic lg:text-2xl text-xl font-semibold text-primary-800"
        )}
      >
        Global Forum
      </h1>
      <h2
        className={cn(
          inter.className,
          "italic text-center lg:text-7xl text-5xl font-bold text-primary-800"
        )}
      >
        See What&apos;s trending
      </h2>
      <p
        className={cn(
          inter.className,
          "text-center my-4 font-medium text-primary-800 text-xs lg:text-base"
        )}
      >
        your ultimate hub{" "}
        <span className="bg-secondary-200">for all things happening</span> in
        the vibrant world of the
        <br />
        Collectiv Community Space
      </p>
      {!user && (
        <div
          style={{ width: "min(100%, 400px)" }}
          className="flex items-center justify-center gap-8 rounded-xl bg-secondary-200 py-3 text-sm lg:text-base mt-2"
        >
          <span className="text-secondary-500 font-semibold">
            Register now and join the fun!
          </span>
          <Link
            className="py-2 px-7 rounded-full text-secondary-200 bg-secondary-500"
            href={"/accounts/signup"}
          >
            Register
          </Link>
        </div>
      )}
      {trendingPosts.data && <WordCloud topWords={jointTopWords} />}
      {trendingPosts.isFetching && <BeatLoader color={COLORS.primary[500]} />}
      {noPosts && (
        <p className="lg:text-2xl text-lg font-semibold italic text-primary-600 grow flex items-center">
          Nothing is trending right now!
        </p>
      )}
      {visiblePosts?.map((post, i) => {
        return <GlobalForumPost key={post.id} post={post} />;
      })}
    </div>
  );
};

export default GlobalForum;
