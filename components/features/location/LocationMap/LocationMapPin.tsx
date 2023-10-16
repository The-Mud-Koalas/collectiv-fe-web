import { COLORS } from "@/utils/constants/colors";
import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import React from "react";

interface Props {
  lat: number;
  lng: number;
}

const LocationMapPin: React.FC<Props> = ({ lat, lng }) => {
  return (
    <OverlayViewF
      position={{ lat, lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <svg
        className="translate-x-1/2 -translate-y-1/2"
        width="64"
        height="67"
        viewBox="0 0 64 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g filter="url(#filter0_d_842_7728)">
          <path
            d="M35.5 48C48.7548 48 59.5 37.2548 59.5 24C59.5 10.7452 48.7548 0 35.5 0C22.2452 0 11.5 10.7452 11.5 24L4 58.5L35.5 48Z"
            fill={COLORS.secondary[200]}
          />
        </g>
        <path d="M23.5 35.68H47.5V11.68H23.5V35.68Z" fill="url(#pattern0)" />
        <defs>
          <filter
            id="filter0_d_842_7728"
            x="0"
            y="0"
            width="63.5"
            height="66.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_842_7728"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_842_7728"
              result="shape"
            />
          </filter>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_842_7728" transform="scale(0.015625)" />
          </pattern>
          <image
            id="image0_842_7728"
            width="64"
            height="64"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </OverlayViewF>
  );
};

export default LocationMapPin;
