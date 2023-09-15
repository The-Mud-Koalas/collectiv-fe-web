import { useEventCreationContext } from "@/context/event/EventCreationContext";
import React from "react";
import StageButton from "./StageButton";

interface Props {
  stages: EventCreationStages[]
}

const StageToggler: React.FC<Props> = ({ stages }) => {
  return (
    <div className="bg-slate-100 w-fit p-3 rounded-full flex gap-3 ">
      {
        stages.map(
          (stageItem, idx) => <StageButton name={stageItem.name} idx={idx} key={`stage-${idx}`} />
        )
      }
    </div>
  );
};

export default StageToggler;
