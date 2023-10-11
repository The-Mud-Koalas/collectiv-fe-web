import { FC } from "react";
import Header from "./Header";
import InformUser from "./InformUser";
import LocationList from "./LocationList";

interface LocationSubscriptionProps {}

const LocationSubscription: FC<LocationSubscriptionProps> = ({}) => {
    return (
        <div className="m-10">
            <Header />
            <LocationList />
            <InformUser />
        </div>
    );
};

export default LocationSubscription;
