import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Locked: React.FC<SvgProps> = ({ color, dimensions }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_SIDE,
    ORIGINAL_SIDE
  );
  return (
    <svg
      width={getWidth(dimensions)}
      height={getHeight(dimensions)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.33333 14.6665V9.33317C9.33333 7.56506 10.0357 5.86937 11.286 4.61913C12.5362 3.36888 14.2319 2.6665 16 2.6665C17.7681 2.6665 19.4638 3.36888 20.714 4.61913C21.9643 5.86937 22.6667 7.56506 22.6667 9.33317V14.6665M6.66667 14.6665H25.3333C26.8061 14.6665 28 15.8604 28 17.3332V26.6665C28 28.1393 26.8061 29.3332 25.3333 29.3332H6.66667C5.19391 29.3332 4 28.1393 4 26.6665V17.3332C4 15.8604 5.19391 14.6665 6.66667 14.6665Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Locked;
