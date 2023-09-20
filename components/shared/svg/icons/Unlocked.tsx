import { getProportionalDimension } from "@/utils/helpers/display/getProportionalDimension";
import React from "react";

const ORIGINAL_SIDE = 32;

const Unlocked: React.FC<SvgProps> = ({ color, dimensions }) => {
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
        d="M9.33333 14.6669V9.33354C9.33167 7.68027 9.94437 6.08536 11.0525 4.85843C12.1606 3.63149 13.6851 2.86007 15.33 2.69392C16.9749 2.52777 18.6229 2.97874 19.954 3.95929C21.2851 4.93984 22.2043 6.38 22.5333 8.0002M6.66667 14.6669H25.3333C26.8061 14.6669 28 15.8608 28 17.3335V26.6669C28 28.1396 26.8061 29.3335 25.3333 29.3335H6.66667C5.19391 29.3335 4 28.1396 4 26.6669V17.3335C4 15.8608 5.19391 14.6669 6.66667 14.6669Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Unlocked;
