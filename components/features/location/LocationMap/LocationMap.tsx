import { GoogleMap, OverlayView, OverlayViewF } from "@react-google-maps/api";
import React, { useMemo } from "react";
import { LocationMapPin } from ".";

interface Props {
  latitude: number;
  longitude: number;
}

const LocationMap: React.FC<Props> = ({latitude, longitude}) => {
  const CENTER = useMemo(() => ({ lat: -27.497485, lng: 153.013294 }), []);

  return (
    <div className="relative w-full h-96 px-10">

      <GoogleMap
      id="google-map"
        options={{
          scrollwheel: false,
          fullscreenControl: false,
          panControl: false,
          mapTypeControl: false,
          rotateControl: false,
          streetViewControl: false,
          zoomControl: false,
          disableDefaultUI: false,
          keyboardShortcuts: false,
          gestureHandling: "none",
        }}
        zoom={16}
        center={CENTER}
        mapContainerClassName="border-2 border-primary-800 w-full h-full rounded-xl"
      >
        <LocationMapPin lat={latitude} lng={longitude}/>
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
