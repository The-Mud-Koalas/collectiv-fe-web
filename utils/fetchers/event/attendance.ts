import { postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { QueryClient } from "@tanstack/react-query";

interface CheckInAssistedProps {
  event_id: string;
  latitude: number;
  longitude: number;
  participant_email_phone: string;
}

export const checkInAssisted =
  (type: "Participant" | "Volunteer", queryClient: QueryClient) =>
  async (data: CheckInAssistedProps) => {
    queryClient.invalidateQueries({queryKey: ["current-event"]});
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
    queryClient.invalidateQueries({queryKey: ["current-event"]});
    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = `/participation/${type.toLowerCase()}/check-in/self`;

    const checkOut = await postRequest({
      endpoint,
      body: data,
      token: idToken,
    });

    return checkOut;
  };
