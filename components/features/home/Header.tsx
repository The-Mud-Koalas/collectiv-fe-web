import { Button } from "@/components/shared/elements";
import { garamond } from "@/utils/constants/fonts";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className="text-center mx-auto w-[60%] my-40">
            <p className={`${garamond.className} italic text-2xl`}>Hosting</p>
            <h1 className="text-3xl font-bold md:text-5xl text-primary-800 p-10 leading-10">
                Book and manage your event in one place
            </h1>
            <p className="text-lg text-primary-800 mb-5">
                Empower Your Initiatives with{" "}
                <span className="bg-secondary-200">Effortless Hosting:</span>{" "}
                Seamlessly Bring Your Projects and Service Ventures to Life, the
                Quick and Easy Way!
            </p>
            <div className="flex flex-row justify-center gap-4 ">
                <Button className="bg-primary-900 text-primary-200 p-3 rounded-full">
                    Get Started
                </Button>
                <Button className="border border-primary-900 text-primary-900 p-3 rounded-full">
                    What is Hosting?
                </Button>
            </div>
        </div>
    );
};

export default Header;
