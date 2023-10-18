import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_WIDTH = 42;
const ORIGINAL_HEIGHT = 41;

const Star: React.FC<SvgProps> = ({color, dimensions}) => {
  const { getWidth, getHeight } = getProportionalDimension(
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT
  );
  return (
    <svg
      width={getWidth(dimensions)}
      height={getHeight(dimensions)}
      viewBox="0 0 42 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.2487 1.70703L27.3643 14.0966L41.0404 16.0956L31.1445 25.7341L33.4799 39.3508L21.2487 32.9185L9.01745 39.3508L11.3529 25.7341L1.45703 16.0956L15.1331 14.0966L21.2487 1.70703Z"
        stroke="#979C9E"
        strokeWidth="1.48438"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </svg>
  );
};

export default Star;
