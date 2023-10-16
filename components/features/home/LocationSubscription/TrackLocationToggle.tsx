import { LabelledToggler } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";
import { showErrorToast } from "@/lib/toast";
import { setLocationPreference } from "@/utils/fetchers/location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";

const TrackLocationToggle: FC = () => {
  const { userData, isInRN, sendMessageToRN, refetch } = useAppContext();
  const [isTracking, setIsTracking] = useState<boolean>(
    userData?.location_track ?? false
  );


  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: setLocationPreference(queryClient),
    onError: (error: Error) => {
      showErrorToast({ error });
    },
  });

  const toggleSwitch = async () => {
    await mutateAsync({ location_track: !isTracking });

    setIsTracking((prev) => !prev);
  };

  return <LabelledToggler label="Allow location tracking" disabled={isLoading} onToggle={toggleSwitch} isToggledOn={isTracking}/>
};

export default TrackLocationToggle;
