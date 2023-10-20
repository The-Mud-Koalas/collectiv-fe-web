import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import { FC } from "react";

const ORIGINAL_WIDTH = 56;
const ORIGINAL_HEIGHT = 56;

const ReportFlag: FC<SvgProps> = ({ color, dimensions }) => {
    const { getWidth, getHeight } = getProportionalDimension(
        ORIGINAL_WIDTH,
        ORIGINAL_HEIGHT
    );
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={getWidth(dimensions)}
            height={getHeight(dimensions)}
            viewBox="0 0 56 56"
            fill="none"
        >
            <circle
                cx="28"
                cy="28"
                r="26.5"
                fill={color}
                stroke="#B51435"
                stroke-width="3"
            />
            <path
                d="M18.0439 31.7334C18.0439 31.7334 19.2884 30.489 23.0217 30.489C26.7551 30.489 29.2439 32.9779 32.9773 32.9779C36.7106 32.9779 37.9551 31.7334 37.9551 31.7334V16.8001C37.9551 16.8001 36.7106 18.0446 32.9773 18.0446C29.2439 18.0446 26.7551 15.5557 23.0217 15.5557C19.2884 15.5557 18.0439 16.8001 18.0439 16.8001V31.7334ZM18.0439 31.7334V40.4446"
                stroke="#B51435"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default ReportFlag;
