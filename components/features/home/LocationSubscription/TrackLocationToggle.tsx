import { FC, useState } from "react";
import Switch from "react-switch";

interface TrackLocationToggleProps {}

const TrackLocationToggle: FC<TrackLocationToggleProps> = ({}) => {
    const [isTracking, setIsTracking] = useState<boolean>(false);

    const toggleSwitch = () => {
        setIsTracking((prev) => !prev);
    };

    return (
        <div className="bg-secondary-200 rounded-2xl px-5 py-3 w-[400px] mx-auto flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3 items-center ">
                <span className="w-9 h-9 bg-sky-100 rounded-full p-2 flex items-center justify-center">
                    📍
                </span>
                <p className="text-secondary-500 text-xl font-semibold">
                    Allow location tracking
                </p>
            </div>
            <Switch
                onChange={toggleSwitch}
                checked={isTracking}
                checkedIcon={false}
                uncheckedIcon={false}
            />
        </div>
    );
};

export default TrackLocationToggle;
