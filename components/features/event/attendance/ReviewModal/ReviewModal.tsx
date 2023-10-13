import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { inter } from "@/utils/constants/fonts";
import ReviewForm from "./ReviewForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutSelf } from "@/utils/fetchers/event/attendance";
import { useGPSLocation } from "@/hooks/utils/useGPSLocation";

interface Props {
  isParticipant: boolean;
  eventId: string;
}

const ReviewModal: React.FC<Props> = ({ isParticipant, eventId }) => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { lat, lng } = useGPSLocation();

  const participationType = isParticipant ? "Participant" : "Volunteer";

  const { mutateAsync } = useMutation({
    mutationFn: checkOutSelf(participationType, queryClient),
  });

//   useEffect(() => {
//     const checkOut = async () => {
//       const data = !isParticipant
//         ? { event_id: eventId }
//         : { event_id: eventId, latitude: lat, longitude: lng };
//         await mutateAsync(data);
//     };
//     checkOut();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const onStarSelect = (rating: number) => () => {
    setSelectedStar(rating);
  };
  return (
    <div
      style={{ width: "min(90vw, 600px)" }}
      className={`${inter.className} relative rounded-2xl bg-white px-8 py-6 flex flex-col gap-2`}
    >
      <h1 className="font-semibold text-3xl">How was the Event?</h1>

      <StarRating onStarSelect={onStarSelect} selectedStar={selectedStar} />
      <ReviewForm rating={selectedStar} />
    </div>
  );
};

export default ReviewModal;
