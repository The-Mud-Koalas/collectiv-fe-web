import { FC } from "react";
import Header from "../../components/features/home/LocationSubscription/Header";
import InformUser from "../../components/features/home/LocationSubscription/InformUser";
import LocationList from "../../components/features/home/LocationSubscription/LocationList";

interface LocationSubscriptionProps {}

const LocationSubscription: FC<LocationSubscriptionProps> = ({}) => {
    return (
        <div className="p-5 md:p-10">
            <Header />
            <LocationList />
            <InformUser />
        </div>
    );
};

export default LocationSubscription;
