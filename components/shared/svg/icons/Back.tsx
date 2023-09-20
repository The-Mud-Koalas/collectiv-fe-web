import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Back: React.FC<SvgProps> = ({ color, dimensions }) => {
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
      <circle cx="16" cy="16" r="12" stroke={color} stroke-width="2.66667" />
      <path
        d="M14.6665 12L10.6665 16L14.6665 20"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
      <path
        d="M10.6665 16L19.9998 16"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Back;
