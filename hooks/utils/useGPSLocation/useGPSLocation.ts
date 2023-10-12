import { useEffect, useState } from "react";

const useGPSLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    const gpsPromise: Promise<GeolocationPosition> = new Promise(
      (resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const getCoords = async () => {
      const coords = await gpsPromise;
      setLat(coords.coords.latitude);
      setLng(coords.coords.longitude);
    };
    getCoords();
  }, []);

  return { lat, lng };
};

export { useGPSLocation };
