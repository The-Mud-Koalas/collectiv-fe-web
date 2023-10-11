import { getRequest } from "@/lib/fetch";
import { User } from "firebase/auth";

const getParticipation = (user: User | null, eventId: string) => async () => {
  if (!user) return null;
  const token = await user.getIdToken();
  const response = (await getRequest({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/participation/check-participation/?event_id=${eventId}`,
    token,
  })) as EventParticipation;
  return response;
};


export { getParticipation }