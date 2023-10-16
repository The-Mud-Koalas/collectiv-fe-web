import { Switch, UncontrolledSwitch } from "@/components/shared/elements";
import { FC, useState } from "react";

interface TrackLocationToggleProps {}

const TrackLocationToggle: FC<TrackLocationToggleProps> = ({}) => {
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsTracking((prev) => !prev);
  };

  return (
    <div className="bg-secondary-200 rounded-2xl px-5 py-3 max-w-[400px] mx-auto flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 items-center ">
        <span className="w-9 h-9 bg-sky-100 rounded-full p-2 flex items-center justify-center">
          📍
        </span>
        <p className="text-secondary-500 md:text-xl font-semibold">
          Allow location tracking
        </p>
      </div>
      <div className="mx-auto">
        <Switch isToggledOn={isTracking} onToggle={toggleSwitch} />
      </div>
    </div>
  );
};

export default TrackLocationToggle;
