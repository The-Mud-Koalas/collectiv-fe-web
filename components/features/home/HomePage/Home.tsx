import { Button } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/lib/firebase";
import React, { useEffect } from "react";
import Header from "./Header";
import RewardInfographic from "./RewardInfographic";
import LocationInfographic from "./LocationInfographic";
import AdditionalInfo from "./AdditionalInfo";

const Home = () => {
    const { sendMessageToRN } = useAppContext();

    return (
        <div className="flex flex-col gap-20 m-10">
            <Header />
            <RewardInfographic />
            <LocationInfographic />
            <AdditionalInfo />
        </div>
    );
};

export default Home;
