import { FC, useEffect, useState } from "react";
import { getRequest } from "@/lib/fetch";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { auth } from "@/lib/firebase";

interface LocationListProps {}

type LocationType = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

const LocationList: FC<LocationListProps> = ({}) => {
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [subscribedLocation, setSubScribedLocation] = useState<
        LocationType[]
    >([]);
    async function getLocations() {
        // try {
        //     const response = await fetch(
        //         "https://mud-koalas-communal-space-stg-oxybezqe2a-ts.a.run.app/space/all/"
        //     );
        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //     }
        //     const result = await response.json();
        //     setLocations(result);
        // } catch (error) {
        //     console.error(error);
        // }
        const idToken = await auth.currentUser?.getIdToken();
        console.log({ idToken });

        const allLocation = await getRequest({
            endpoint: "/space/get-or-create",
            token: idToken,
        });
        setLocations(allLocation);
    }

    async function getSubscribedLocation() {
        try {
            const response = await fetch(
                "https://mud-koalas-communal-space-stg-oxybezqe2a-ts.a.run.app/space/subscribed/"
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setSubScribedLocation(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLocations();
        getSubscribedLocation();
    }, []);

    return (
        <div className="text-center">
            <span className="w-10 h-10 bg-secondary-200 rounded-full p-2 flex items-center justify-center mx-auto">
                ❇️
            </span>
            <h1 className="text-5xl font-bold">Check our Locations</h1>
            <div className="flex flex-col w-[921px] mx-auto my-10">
                {locations.map((location: LocationType) => (
                    <div
                        className={`flex flex-row justify-between items-center border-b-2 border-sky-500 py-3 ${
                            subscribedLocation.includes(location)
                                ? "bg-red"
                                : ""
                        }`}
                    >
                        <p className="text-sky-500 text-xl">{location.name}</p>
                        <div className="rounded-full border border-sky-500">
                            <Arrow
                                color={COLORS.sky[500]}
                                dimensions={{ width: 20 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationList;
