import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import StatisticBox from "./StatisticBox";
import Link from "next/link";
import { Arrow } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import MapImage from "@/components/shared/images/mapImage.png";
import Image from "next/image";
interface LocationInfographicProps {}

const LocationInfographic: FC<LocationInfographicProps> = ({}) => {
    return (
        <div
            className={`${inter.className}  rounded-2xl background-div bg-secondary-200 px-5 py-20 my-40`}
        >
            <div className="flex flex-wrap-reverse justify-evenly items-center inside-div">
                <div className="flex flex-col gap-3 w-[500px] ">
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
                <div className="max-w-[500px] mx-5">
                    <p className="text-2xl md:text-4xl font-semibold leading-snug mb-5 text-secondary-500">
                        Events anywhere— register on your device or our
                        community screen
                    </p>
                    <Link
                        className="bg-primary-800 flex justify-between gap-2 items-center px-6 py-3 text-primary-200 font-light rounded-3xl mb-5 max-w-[240px]"
                        href={"/location"}
                    >
                        <p>Check out location</p>
                        <Arrow
                            color={COLORS.primary[200]}
                            dimensions={{ width: 20 }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LocationInfographic;
