import { FC } from "react";
import HostingCard from "./HostingCard";
import { Button } from "@/components/shared/elements";
import { garamond } from "@/utils/constants/fonts";
import CollectivLogoHorizontal from "../../shared/svg/logo/CollectivLogoHorizontal";
import { Arrow } from "@/components/shared/svg/icons";

interface HostingProps {}

const cardContent = [{}];

const Hosting: FC<HostingProps> = ({}) => {
    return (
        <div className="rounded-3xl bg-secondary-200 p-10">
            <div className="flex flex-row justify-end">
                <Button className=" bg-primary-900 rounded-full p-3 text-primary-200">
                    Get Started
                </Button>
                {/* <Arrow
                    color="bg-primary-200"
                    dimensions={{ width: 20, height: 20 }}
                /> */}
            </div>
            <div className="flex flex-col gap-2 w-30">
                <div className="flex flex-row items-start gap-2">
                    <h1
                        className={`${garamond.className} text-4xl my-2 italic`}
                    >
                        What is Hosting in
                    </h1>
                    <CollectivLogoHorizontal size="lg" colorCode="black" />
                </div>

                <p className="w-[60%] text-md my-5">
                    Hosting on Collectiv is the art of self-sustaining your
                    dreams. It's about taking your vision, whether it's a
                    community project, a service initiative, or a special event,
                    and bringing it to life effortlessly.
                </p>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-10 my-5">
                <HostingCard
                    title="Book Space"
                    content="Find the ideal community space for your event or project and book it seamlessly through Collectiv."
                />
                <HostingCard
                    title="Market Event"
                    content="Spread the word and generate interest in your cause through our forum and participation/volunteer  registration."
                />
                <HostingCard
                    title="Connect"
                    content="Reach out to your community and build meaningful connections."
                />
            </div>
        </div>
    );
};

export default Hosting;
