import React, { useEffect, useRef } from "react";
import ForumPost from "./ForumPost";
import ForumInput from "./ForumInput";
import { useInfinitePosts, useNewPosts } from "@/hooks/forum";
import { useAppContext } from "@/context/AppContext";
import { useIntersectionObserver } from "@/hooks/display";
import { BeatLoader } from "react-spinners";
import { COLORS } from "@/utils/constants/colors";
import { garamond } from "@/utils/constants/fonts";
import { StatisticCard } from "../dashboard/dataviz";
import { MdOutlineForum } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai"

const Forum = ({ eventDetails }: { eventDetails: EventDetail }) => {
  const { user } = useAppContext();
  const pageAccessDate = useRef(new Date());

  const {
    posts: oldPosts,
    getMorePosts,
    isExhausted: noMorePosts,
    isFetching: isFetchingOldPosts,
    isFetchingNextPage: isFetchingMorePosts,
    revalidate: revalidateOldPosts,
  } = useInfinitePosts({
    eventDetails,
    fetchLimit: 5,
    postsBeforeDate: pageAccessDate.current,
  });

  const {
    posts: newPosts,
    revalidate: revalidateNewPosts,
    pause,
    unpause,
  } = useNewPosts({
    eventDetails,
    postsAfterDate: pageAccessDate.current,
  });

  const inputRef = useRef<HTMLDivElement>(null);
  const forumInput = useIntersectionObserver(inputRef, { threshold: 1 });

  const lastPostRef = useRef<HTMLDivElement>(null);
  const lastPost = useIntersectionObserver(lastPostRef, { threshold: 0.99 });

  useEffect(() => {
    if (forumInput?.isIntersecting) {
      unpause();
    } else {
      pause();
    }
  }, [pause, unpause, forumInput?.isIntersecting]);

  useEffect(() => {
    if (!noMorePosts && !isFetchingOldPosts && lastPost?.isIntersecting) {
      getMorePosts();
    }
  }, [noMorePosts, isFetchingOldPosts, lastPost?.isIntersecting]);

  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  const allPosts = oldPosts.concat(newPosts);
  const numPosts = allPosts.length;
  const numTrendingPosts = allPosts.filter(post => post.vote_count >= 30).length;

  return (
    <div className="flex flex-col items-center gap-4 lg:p-16 p-10">
      <div className="flex items-center gap-40 w-full my-4 px-32">
        <StatisticCard
          icon={<MdOutlineForum />}
          value={formatter.format(numPosts)}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Forum Posts
          </p>
        </StatisticCard>
        <StatisticCard
          icon={<AiOutlineFire />}
          value={formatter.format(numTrendingPosts)}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Trending Posts
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *posts with 30+ upvotes from this event
          </p>
        </StatisticCard>
        <StatisticCard
          icon={<MdOutlineForum />}
          value={"'Hello'"}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Trending words
          </p>
        </StatisticCard>
      </div>
      <p
        className={`self-start ${garamond.className} text-4xl italic font-bold`}
      >
        Write a post
      </p>
      <ForumInput ref={inputRef} eventDetails={eventDetails} />
      {newPosts.map((post) => (
        <ForumPost
          key={post.id}
          post={post}
          user={user}
          eventId={eventDetails.id}
          onVote={revalidateNewPosts}
        />
      ))}
      {oldPosts.map((post, i) => {
        if (i === oldPosts.length - 1) {
          return (
            <ForumPost
              key={post.id}
              ref={lastPostRef}
              user={user}
              post={post}
              eventId={eventDetails.id}
              onVote={revalidateOldPosts}
            />
          );
        }
        return (
          <ForumPost
            key={post.id}
            user={user}
            post={post}
            eventId={eventDetails.id}
            onVote={revalidateOldPosts}
          />
        );
      })}
      {isFetchingMorePosts && <BeatLoader color={COLORS.primary[500]} />}
      {noMorePosts && (
        <p className="lg:text-2xl text-lg font-semibold italic text-primary-600">
          You're all caught up!
        </p>
      )}
    </div>
  );
};

export default Forum;
