import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { garamond, inter } from "@/utils/constants/fonts";
import ReviewForm from "./ReviewForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutSelf } from "@/utils/fetchers/event/attendance";
import { useGPSLocation } from "@/hooks/utils/useGPSLocation";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/shared/elements";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  isParticipant: boolean;
  eventId: string;
  onClose: () => void;
  participation: EventParticipationData | null;
}

const ReviewModal: React.FC<Props> = ({ isParticipant, eventId, onClose, participation }) => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const searchParams = useSearchParams();

  const showThanksMessage = searchParams.get("reviewSubmitted") === "true" || participation?.submitted_review;

  const onStarSelect = (rating: number) => () => {
    setSelectedStar(rating);
  };


  return (
    <div
      style={{ width: "min(90vw, 600px)" }}
      className={`${inter.className} relative rounded-2xl bg-white px-8 py-6`}
    >
      <AnimatePresence mode="popLayout">
        {!showThanksMessage ? (
          <motion.div
            className="flex flex-col gap-2"
            key="rating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
            >
              <RxCross2 />
            </button>
            <h1 className="font-semibold text-3xl">How was the Event?</h1>

            <StarRating
              onStarSelect={onStarSelect}
              selectedStar={selectedStar}
            />
            <ReviewForm
              rating={selectedStar}
              eventId={eventId}
              onClose={onClose}
            />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-3"
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="28"
                cy="28"
                r="26.5"
                fill="#BAF67E"
                stroke="#163300"
                stroke-width="3"
              />
              <path
                d="M37.9551 20.5332L24.2662 34.2221L18.0439 27.9999"
                stroke="#163300"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <h1 className={`${garamond.className} font-normal text-4xl`}>
              Thanks for Coming!
            </h1>
            <Button
              onClick={onClose}
              className="self-center bg-primary-800 text-primary-300 font-medium items-center px-20 rounded-full gap-4 py-2 text-base w-fit justify-center flex"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewModal;
