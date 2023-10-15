import { FC } from "react";
import { inter, garamond } from "@/utils/constants/fonts";
import Link from "next/link";
interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div
            className={`${inter.className} text-center p-10 max-w-4xl mx-auto mb-40 mt-10`}
        >
            <h1 className="text-primary-900 py-5 font-semibold md:leading-snug text-4xl md:text-6xl lg:text-7xl">
                Your sanctuary for{" "}
                <span className={`${garamond.className} italic font-light`}>
                    Community
                </span>{" "}
                events
            </h1>
            <p className="md:text-2xl py-5">
                The platform for you to{" "}
                <span className="bg-secondary-200 ">
                    connect, create, celebrate
                </span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    className="border border-primary-800 rounded-full text-primary-800 py-2 min-w-[167px]"
                    href={"/event/discover"}
                >
                    View Events
                </Link>
                <Link
                    // disabled={isLoading}
                    type="submit"
                    className="border border-primary-800 bg-primary-800 flex justify-center items-center py-2 min-w-[167px] rounded-full"
                    href={"/accounts/signup"}
                >
                    <p className="text-primary-200">Register Now</p>
                </Link>
            </div>
        </div>
    );
};

export default Header;
