import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";

interface RewardInfographicProps {}

const RewardInfographic: FC<RewardInfographicProps> = ({}) => {
    return (
        <div className={`${inter.className} bg-secondary-200 rounded-lg p-5`}>
            <div className="flex flex-wrap items-center gap-2 justify-center">
                <div className="w-[677px]">
                    <span className="w-10 h-10 bg-white rounded-full p-2 flex items-center justify-center">
                        ❇️
                    </span>

                    <p className={`${garamond.className} text-xl`}>
                        Get your benefits
                    </p>
                    <p className="text-lg font-semibold text-secondary-500">
                        Events Made Rewarding: Participate, Collect Points, and
                        Embrace Your Interests!
                    </p>
                </div>
                <div className="w-[485px]">
                    <p className="text-secondary-400">
                        Sollicitant homines non sunt nisi quam formae rerum
                        principiis opiniones. Mors enim est terribilis ut
                        Socrati aliud esse apparet. Sed timor mortis est notio
                        terribile
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RewardInfographic;
