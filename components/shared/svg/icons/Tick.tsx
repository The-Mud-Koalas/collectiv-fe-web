import React from "react";
import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";

const ORIGINAL_SIDE = 32;
const Tick: React.FC<SvgProps> = ({ color, dimensions }) => {
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
        d="M26.6667 8L12 22.6667L5.33334 16"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Tick;
