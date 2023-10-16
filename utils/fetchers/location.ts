import { getRequest, postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { QueryClient } from "@tanstack/react-query";

interface LocationPreferenceProps {
  location_track: boolean;
}

export const setLocationPreference =
  (queryClient: QueryClient) => async (body: LocationPreferenceProps) => {
    queryClient.invalidateQueries({ queryKey: ["user-info"] });

    const idToken = await auth.currentUser?.getIdToken();
    const endpoint = `/user/update/location-tracking-preference`;

    const updateLocationTracking = await postRequest({
      endpoint,
      body,
      token: idToken,
    });

    return updateLocationTracking;
  };

  interface SubscribeLocationProps {
    location_id: string;
    subscribe: boolean;
  }
export const subscribeToLocation = (queryClient: QueryClient) => async (body: SubscribeLocationProps) => {
  queryClient.invalidateQueries({ queryKey: ["locations-subscribed"]});
  const token = await auth.currentUser?.getIdToken();
  const endpoint = "/space/preference/update";

  const subscribeToLocation = await postRequest({
    endpoint,
    body,
    token
  });

  return subscribeToLocation as EventLocation;
}

export const getLocationById = async (locationId: string) => {
  const endpoint = `/space/detail/${locationId}`;

  const location = await getRequest({ endpoint });
  return location;
}