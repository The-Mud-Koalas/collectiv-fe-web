import React, { forwardRef, useEffect, useRef, useState } from "react";
import { garamond, inter } from "@/utils/constants/fonts";
import { BsArrowDownCircle } from "react-icons/bs";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import { motion } from "framer-motion";
import cn from "clsx";
import { User } from "firebase/auth";
import { useTime } from "@/hooks/forum";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/lib/fetch";
import { capitalize } from "@/utils/helpers/formatting/capitalize";

interface Props {
  user: User | null;
  post: ForumPost;
  eventId: string;
  onVote: (postId: string) => void;
}

const ForumPost = forwardRef<HTMLDivElement, Props>(
  ({ user, post, eventId, onVote }: Props, ref) => {
    const tickInterval = useRef(1000 * 60);
    const now = useTime(tickInterval.current);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [isTextOverflowing, setIsTextOverflowing] = useState(false);
    const [isReadingMore, setIsReadingMore] = useState(false);

    const LINE_HEIGHT = 25;
    const LINES = 3;
    const dateFormatter = new Intl.RelativeTimeFormat("en");
    const diff = now.getTime() - new Date(post.posted_at).getTime();
    const minutes = Math.round(diff / (1000 * 60));
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    let relativeTime = "";

    if (minutes < 1) {
      relativeTime = "just now";
    } else if (minutes < 60) {
      relativeTime = dateFormatter.format(-minutes, "minutes");
    } else if (hours < 24) {
      relativeTime = dateFormatter.format(-hours, "hours");
    } else {
      relativeTime = dateFormatter.format(-days, "days");
    }

    useEffect(() => {
      if (!contentRef.current) return;

      const element = contentRef.current;

      const observer = new ResizeObserver(() => {
        if (element.scrollHeight > LINE_HEIGHT * LINES) {
          setIsTextOverflowing(true);
        } else {
          setIsTextOverflowing(false);
        }
      });

      observer.observe(element);

      return () => observer.disconnect();
    }, []);

    const userUpvotedPost = user && post.upvoters.includes(user.uid);
    const userDownvotedPost = user && post.downvoters.includes(user.uid);

    const readMoreVisible = isTextOverflowing && !isReadingMore;

    const upvote = useMutation({
      mutationFn: async () => {
        if (!user) return null;
        const token = await user.getIdToken();
        await postRequest({
          token,
          body: { post_id: post.id },
          endpoint: `/forums/${eventId}/upvote`,
        });
      },
      onSuccess: () => {
        onVote(post.id);
      },
      onError: (e: any) => {
        console.log(e.cause.message);
      },
    });

    const downvote = useMutation({
      mutationFn: async () => {
        if (!user) return null;
        const token = await user.getIdToken();
        await postRequest({
          token,
          body: { post_id: post.id },
          endpoint: `/forums/${eventId}/downvote`,
        });
      },
      onSuccess: () => {
        onVote(post.id);
      },
    });

    return (
      <div
        ref={ref}
        className="py-8 px-6 border-[3px] border-primary-700 rounded-lg flex flex-col bg-tertiary-100 w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <p
              className={cn(
                garamond.className,
                "lg:text-4xl text-3xl font-bold"
              )}
            >
              {post.author_name}
            </p>
            <div
              className={cn(
                "border-[2px] px-3 rounded-xl text-sm font-bold",
                inter.className,
                {
                  "border-primary-500 bg-primary-100 text-primary-500":
                    post.author_role === "volunteer",
                  "border-secondary-500 bg-secondary-200 text-secondary-500":
                    post.author_role === "creator",
                  "border-gray-500 bg-gray-200 text-gray-500":
                    post.author_role === "participant",
                }
              )}
            >
              {capitalize(post.author_role)}
            </div>
          </div>
        </div>
        <div className="relative flex lg:items-center items-start justify-between gap-8">
          <motion.p
            ref={contentRef}
            initial={false}
            animate={{
              height: isReadingMore ? "auto" : LINE_HEIGHT * LINES,
            }}
            style={{
              lineHeight: `${LINE_HEIGHT}px`,
            }}
            className={cn(
              "lg:text-base text-sm overflow-hidden w-full font-medium",
              inter.className
            )}
          >
            {post.content}
          </motion.p>
        </div>
        {readMoreVisible && <span className="font-bold tracking-widest text-lg leading-none">...</span>}
        <div
          className={cn("flex items-center gap-4 mt-4 justify-end", {
            "justify-between": isTextOverflowing,
          })}
        >
          {isTextOverflowing && (
            <button
              onClick={() => setIsReadingMore(!isReadingMore)}
              className="flex items-center gap-2 hover:bg-gray-400 hover:bg-opacity-20 w-fit rounded-xl p-1 font-semibold"
            >
              <motion.span
                initial={false}
                animate={{ rotate: !isReadingMore ? 0 : -180 }}
                transition={{ rotate: { ease: "linear" } }}
                className="flex items-center justify-center"
              >
                <BsArrowDownCircle />
              </motion.span>
              <span className="text-sm">
                Read {!isReadingMore ? "More" : "Less"}
              </span>
            </button>
          )}

          <div className="flex items-center gap-4">
            <span className="italic text-gray-500 text-sm">
              Posted {relativeTime}
            </span>
            <button
              onClick={() => upvote.mutate()}
              className={cn(
                "h-6 w-6 rounded flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-40 text-2xl"
              )}
            >
              <PiArrowFatUp
                className={cn(userUpvotedPost && "fill-secondary-300")}
              />
            </button>
            <span className="font-bold text-lg">{post.vote_count}</span>
            <button
              onClick={() => downvote.mutate()}
              className={cn(
                "h-6 w-6 rounded flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-40 text-2xl"
              )}
            >
              <PiArrowFatDown
                className={cn(userDownvotedPost && "fill-danger-200")}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ForumPost;
