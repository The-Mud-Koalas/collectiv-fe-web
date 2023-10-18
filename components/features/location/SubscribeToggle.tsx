import { LabelledToggler } from "@/components/shared/elements";
import { showErrorToast } from "@/lib/toast";
import { subscribeToLocation } from "@/utils/fetchers/location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  isSubscribed: boolean;
}

const SubscribeToggle: React.FC<Props> = ({ isSubscribed }) => {
  const [_isSubscribed, _setSubscribed] = useState(isSubscribed);

  const router = useRouter();
  const locationId = router.query.id as string;
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: subscribeToLocation(queryClient),
    onError: (error: Error) => showErrorToast({ error }),
  });

  const toggleSubscribe = async () => {
    const data = {
      location_id: locationId,
      subscribe: !_isSubscribed,
    };

    await mutateAsync(data);
    _setSubscribed((prev) => !prev);
  };

  return (
    <LabelledToggler
      isToggledOn={_isSubscribed}
      label="Subscribe to this location"
      onToggle={toggleSubscribe}
      disabled={isLoading}
    />
  );
};

export default SubscribeToggle;
