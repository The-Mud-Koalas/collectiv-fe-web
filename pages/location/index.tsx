import { FC } from "react";
import Header from "../../components/features/home/LocationSubscription/Header";
import InformUser from "../../components/features/home/LocationSubscription/InformUser";
import LocationList from "../../components/features/home/LocationSubscription/LocationList";
import { Template } from "@/components/shared/layouts";
import { Switch } from "@/components/shared/elements";

interface LocationSubscriptionProps {}

const LocationSubscription: FC<LocationSubscriptionProps> = ({}) => {
  return (
    <Template>
      <div className="p-5 md:p-10">
        <Header />
        <LocationList />
        <InformUser />
      </div>
    </Template>
  );
};

export default LocationSubscription;
