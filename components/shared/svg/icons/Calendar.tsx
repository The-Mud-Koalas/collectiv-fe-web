import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Calendar: React.FC<SvgProps> = ({ color, dimensions }) => {
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
        d="M21.3333 2.66675V8.00008M10.6667 2.66675V8.00008M4 13.3334H28M6.66667 5.00008H25.3333C26.8061 5.00008 28 6.19399 28 7.66675V26.3334C28 27.8062 26.8061 29.0001 25.3333 29.0001H6.66667C5.19391 29.0001 4 27.8062 4 26.3334V7.66675C4 6.19399 5.19391 5.00008 6.66667 5.00008Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Calendar;
