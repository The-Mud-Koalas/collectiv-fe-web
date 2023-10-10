import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import StatisticBox from "./StatisticBox";
import { Button } from "@/components/shared/elements";
interface LocationInfographicProps {}

const LocationInfographic: FC<LocationInfographicProps> = ({}) => {
    return (
        <div
            className={`${inter.className} rounded-lg bg-primary-200 px-5 py-20`}
        >
            <div className="flex flex-wrap justify-evenly items-center ">
                <div className="flex flex-col gap-3 w-[500px]">
                    <StatisticBox value="124" label="Events Present" />
                    <StatisticBox
                        value="350+"
                        label="Registered Participants"
                    />
                    <StatisticBox
                        value="88%"
                        label="Positive user satisfaction"
                    />
                </div>
                <div className="w-[500px]">
                    <p className="text-4xl font-semibold  my-5">
                        Events anywhere— register on your device or our
                        community screen
                    </p>
                    <Button className="bg-primary-800 flex justify-center items-center p-2 px-6 text-primary-200 font-light rounded-3xl">
                        Check out location{" "}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LocationInfographic;
