import { Button } from "@/components/shared/elements";
import { Chevron } from "@/components/shared/svg/icons";
import { COLORS } from "@/utils/constants/colors";
import { garamond, inter } from "@/utils/constants/fonts";

import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className="text-center mx-auto max-w-3xl mt-20 md:mt-40 mb-40">
            <p className={`${garamond.className} italic text-2xl`}>Hosting</p>
            <h1
                className={`${inter.className} font-bold text-4xl xl:text-7xl md:text-5xl lg:text-7xl text-primary-800 p-10 leading-10`}
            >
                Book and manage your event in one place
            </h1>
            <p
                className={`${inter.className} text-md xl:text-lg md:text-lg lg:text-lg text-primary-900 mb-5`}
            >
                Empower Your Initiatives with{" "}
                <span className="bg-secondary-200">Effortless Hosting:</span>{" "}
                Seamlessly Bring Your Projects and Service Ventures to Life, the
                Quick and Easy Way!
            </p>
            <div
                className={`${inter.className} flex flex-wrap justify-center gap-4 w-[60%] mx-auto`}
            >
                <Button className="bg-primary-900 text-primary-200 px-3 py-2 rounded-full">
                    Get Started
                </Button>
                <Button
                    className={`${inter.className} flex flex-row justify-center gap-2 border items-center border-primary-900 text-primary-900 px-3 py-2 rounded-full`}
                >
                    <p>What is Hosting?</p>
                    <Chevron
                        color={COLORS.primary[900]}
                        dimensions={{ width: 15, height: 15 }}
                    />
                </Button>
            </div>
        </div>
    );
};

export default Header;
