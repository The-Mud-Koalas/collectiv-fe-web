import { Button } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import React from "react";
import EventRadioButton from "./EventRadioButton";

interface Props {
  title: string;
  description: string;
  clickHandler: () => void;
  selectedWhen: boolean;
}

const EventTypeChoice: React.FC<Props> = ({
  title,
  description,
  clickHandler,
  selectedWhen,
}) => {
  return (
    <Button
      onClick={clickHandler}
      type="button"
      className="bg-slate-200 border-2 p-4 sm:p-3 border-black rounded-xl"
    >
      <div className="flex gap-2 items-center mb-2">
        <EventRadioButton isSelected={selectedWhen} />
        <h4 className={`${inter.className} font-semibold text-base sm:text-lg`}>{title}</h4>
      </div>
      <p className={`${inter.className} font-medium text-sm sm:text-base text-start`}>
        {description}
      </p>
    </Button>
  );
};

export default EventTypeChoice;
