import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 23;
const ORIGINAL_HEIGHT = 22;

const CollectivLogo: React.FC<SvgProps> = ({ dimensions, color }) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT
  );

  return (
    <svg
      width={getWidth(dimensions) || ORIGINAL_WIDTH}
      height={getWidth(dimensions || ORIGINAL_HEIGHT)}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2168 11.1819L7.90907 12.2728L1.37061 7.90912L2.90907 6.09094L10.2168 11.1819Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
      <path
        d="M15.2169 10.4545L12.9092 11.5455L19.4476 16.2727L21.3707 14.8182L15.2169 10.4545Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
      <path
        d="M14.832 15.1818L12.1396 13V21H14.832V15.1818Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
      <path
        d="M10.6016 15.1819V12.6364L2.90918 16.6033L4.06303 18.7852L10.6016 15.1819Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
      <path
        d="M12.9092 9.72728V6.81819L19.8323 3.3732L20.9861 5.55501L12.9092 9.72728Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
      <path
        d="M9.06299 8.27273V1H11.3707V10.0909L9.06299 8.27273Z"
        fill={color}
        stroke={color}
        stroke-width="0.947293"
      />
    </svg>
  );
};

export default CollectivLogo;
