import { postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";

interface CheckInAssistedProps {
    event_id: string;
    latitude: number;
    longitude: number;
    participant_email_phone: string;
}

export const checkInAssisted = (type: "Participant" | "Volunteer") => async (data: CheckInAssistedProps) => {
    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = `/participation/${type.toLowerCase()}/check-in/assisted`

    const checkIn = await postRequest({
        endpoint,
        body: data,
        token: idToken
    });

    return checkIn;
}