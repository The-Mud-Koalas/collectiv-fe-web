import React, { useEffect, useRef, useState } from "react";
import { garamond } from "@/utils/constants/fonts";
import { BsArrowDownCircle } from "react-icons/bs";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import { motion } from "framer-motion";
import cn from "clsx";

interface Props {
  votes: number;
  author: string;
  content: string;
  isUpvotedByUser: boolean;
  isDownvotedByUser: boolean;
}

const ForumPost = ({
  votes,
  author,
  content,
  isUpvotedByUser,
  isDownvotedByUser,
}: Props) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [isReadingMore, setIsReadingMore] = useState(false);

  const LINE_HEIGHT = 25;
  const LINES = 5;

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

  const readMoreVisible = isTextOverflowing && !isReadingMore;
  const readLessVisible = isTextOverflowing && isReadingMore;

  return (
    <div className="py-8 px-6 border-[3px] border-primary-700 rounded-lg flex flex-col bg-tertiary-100">
      <div className="flex items-center justify-between mb-4">
        <p className={cn(garamond.className, "lg:text-4xl text-3xl font-bold")}>
          {author}
        </p>
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
            "text-justify lg:text-base text-sm overflow-hidden",
            readMoreVisible &&
              `after:content-['...'] after:absolute after:bottom-0 lg:after:right-[-13px] after:right-[-11px] after:h-[${LINE_HEIGHT}px after:font-semibold after:tracking-wide`
          )}
        >
          {content}
        </motion.p>
      </div>
      <div
        className={cn("flex items-center gap-4 mt-4 justify-end", {
          "justify-between": isTextOverflowing,
        })}
      >
        {isTextOverflowing && <button
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
        </button>}

        <div className="flex items-center gap-4">
          <button
            className={cn(
              "h-6 w-6 rounded flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-40 text-2xl"
            )}
          >
            <PiArrowFatUp
              className={cn(isUpvotedByUser && "fill-secondary-300")}
            />
          </button>
          <span className="font-bold text-lg">{votes}</span>
          <button
            className={cn(
              "h-6 w-6 rounded flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-40 text-2xl"
            )}
          >
            <PiArrowFatDown
              className={cn(isDownvotedByUser && "fill-danger-200")}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
