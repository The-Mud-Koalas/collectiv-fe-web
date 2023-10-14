import { postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { QueryClient } from "@tanstack/react-query";

interface CheckInAssistedProps {
  event_id: string;
  latitude: number;
  longitude: number;
  participant_email_phone?: string;
  volunteer_email_phone?: string;
}

export const checkInAssisted =
  (type: "Participant" | "Volunteer", queryClient: QueryClient) =>
  async (data: CheckInAssistedProps) => {
    queryClient.invalidateQueries({ queryKey: ["current-event"] });
    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = `/participation/${type.toLowerCase()}/check-in/assisted`;

    const checkIn = await postRequest({
      endpoint,
      body: data,
      token: idToken,
    });

    return checkIn;
  };

interface CheckOutProps {
  event_id: string;
  latitude?: number | null;
  longitude?: number | null;
}
export const checkOutSelf =
  (type: "Participant" | "Volunteer", queryClient: QueryClient) =>
  async (data: CheckOutProps) => {
    queryClient.invalidateQueries({ queryKey: ["current-event"] });
    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = `/participation/${type.toLowerCase()}/check-out/self`;

    const checkOut = await postRequest({
      endpoint,
      body: data,
      token: idToken,
    });

    return checkOut;
  };

type CheckOutAssistedProps = CheckOutProps & {
  participant_email_phone: string;
};
export const checkOutAssisted =
  (queryClient: QueryClient) => async (data: CheckOutAssistedProps) => {
    queryClient.invalidateQueries({ queryKey: ["current-event"] });
    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = "/participation/participant/check-out/assisted";

    const checkOut = await postRequest({
      endpoint,
      body: data,
      token: idToken,
    });

    return checkOut;
  };

interface ReviewProps {
  event_id: string;
  event_rating: number;
  event_comment: string;
}

export const createReview = async (data: ReviewProps) => {
  const idToken = await auth.currentUser?.getIdToken();
  const endpoint = "/review/submit";

  const review = await postRequest({
    endpoint,
    body: data,
    token: idToken,
  });

  return review;
};
