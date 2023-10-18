import React from "react";
import Header from "../../components/features/event/hosting/Header";
import Hosting from "../../components/features/event/hosting/Hosting";
import { Template } from "@/components/shared/layouts";
import RecentEvents from "@/components/features/event/hosting/recentEvents";

const Home = () => {
    return (
        <Template>
            <div className="m-10">
                <Header />
                <Hosting />
                <RecentEvents />
            </div>
        </Template>
    );
};

export default Home;
