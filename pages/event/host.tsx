import React from "react";
import Header from "../../components/features/event/hosting/Header";
import Hosting from "../../components/features/event/hosting/Hosting";
import { Template } from "@/components/shared/layouts";

const Home = () => {
    return (
        <Template>
            <div className="m-10">
                <Header />
                <Hosting />
            </div>
        </Template>
    );
};

export default Home;
