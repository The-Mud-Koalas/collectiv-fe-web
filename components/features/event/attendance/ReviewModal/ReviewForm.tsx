import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { auth } from "@/lib/firebase";
import { showErrorToast } from "@/lib/toast";
import { createReview } from "@/utils/fetchers/event/attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  rating: number | null;
  eventId: string;
  onClose: () => void;
}

interface ReviewSubmission {
  review: string;
}

const ReviewForm: React.FC<Props> = ({ rating, eventId, onClose }) => {
  const { register, handleSubmit } = useForm<ReviewSubmission>();
  rating ??= 0;

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync } = useMutation({ mutationFn: createReview, onError: (error: Error) => showErrorToast({error}) });

  const submitReview: SubmitHandler<ReviewSubmission> = async (data) => {
    if (rating === 0 || rating == null) {
      toast.error(
        "If you decided to review, you should give a rating from 1 - 5."
      );
      return;
    }

    const review = {
      event_id: eventId,
      event_rating: rating,
      event_comment: data.review,
    };

    await mutateAsync(review);

    router.replace(`/event/${eventId}?showCheckOut=true&reviewSubmitted=true`);
  };
  return (
    <form onSubmit={handleSubmit(submitReview)} className="flex flex-col gap-4">
      <TextInputField
        label="Leave a review of this event to inform other members in the community."
        field="review"
        register={register}
      />
      <div className="w-full flex gap-3 px-10">
        <Button
          onClick={onClose}
          type="button"
          className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300"
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
