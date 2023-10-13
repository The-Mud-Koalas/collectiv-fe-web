import { Button } from "@/components/shared/elements";
import { TextInputField } from "@/components/shared/forms";
import { auth } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const submitReview: SubmitHandler<ReviewSubmission> = async (data) => {
    if (rating === 0) return;

    const token = await auth.currentUser?.getIdToken();
    
    router.replace(`/event/${eventId}?showCheckOut=true&reviewSubmitted=true`);
  };
  return (
    <form onSubmit={handleSubmit(submitReview)}>
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
        <Button className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300">
          Check In
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
