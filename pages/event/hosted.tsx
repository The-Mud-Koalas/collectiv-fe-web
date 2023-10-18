import { Template } from "@/components/shared/layouts";
import React from "react";

import { garamond } from "@/utils/constants/fonts";
import { CurrentPastFutureEvents } from "@/components/shared/layouts/CurrentPastFutureEvents";

const HostedEventsPage = () => {
  return (
    <Template>
      <CurrentPastFutureEvents type="hosted" />
    </Template>
  );
};

export default HostedEventsPage;
