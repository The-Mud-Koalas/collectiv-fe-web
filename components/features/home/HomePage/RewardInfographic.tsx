import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import Image from "next/image";
import CollectivIphone from "@/components/shared/images/collectivIphone.png";
import CollectivTablet from "@/components/shared/images/CollectivTablet.png";
import AlertComponent from "@/components/shared/images/TrackingComponent.png";
import TrackingComponent from "@/components/shared/images/AlertImage.png";
import MapImage from "@/components/shared/images/mapImage.png";

interface RewardInfographicProps {}

const RewardInfographic: FC<RewardInfographicProps> = ({}) => {
    return (
        <div
            className={`${inter.className} bg-primary-200 rounded-2xl px-5 py-10 my-40`}
        >
            <div className="flex flex-wrap items-center gap-2 justify-center mx-5">
                <div className="w-[677px]">
                    <span className="w-10 h-10 bg-white rounded-full p-2 flex items-center justify-center">
                        ❇️
                    </span>

                    <p className={`${garamond.className} text-xl mb-2`}>
                        Get your benefits
                    </p>
                    <p className="text-lg font-semibold text-primary-800 mb-1">
                        Events Made Rewarding: Participate, Collect Points, and
                        Embrace Your Interests!
                    </p>
                </div>
                <div className="max-w-[485px]">
                    <p className="text-primary-800 mb-5">
                        Your safety is our utmost concern. We offer you the
                        freedom to toggle your location tracking on or off,
                        enabling you to discover and engage in nearby events
                        wherever you are.
                    </p>
                    <Image
                        src={TrackingComponent}
                        width={501}
                        alt="Tracking Toggle"
                    />
                </div>
            </div>
            <Image
                src={AlertComponent}
                width={328}
                alt="Alert Notification"
            />
            <div className="relative">
                <div className="absolute top-100 right-4"></div>
            </div>
            {/* <div className="flex flex-wrap items-center justify-center gap-10"> */}
            <Image
                src={CollectivTablet}
                width={798}
                height={577}
                alt="Collectiv app on Tablet"
            />
            <Image
                src={CollectivIphone}
                width={354}
                height={668}
                alt="Collectiv app on Iphone"
            />
            {/* </div> */}
        </div>
    );
};

export default RewardInfographic;
