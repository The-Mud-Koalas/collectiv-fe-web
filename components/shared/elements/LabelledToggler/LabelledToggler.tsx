import React from "react";
import { Switch } from "..";

type Props = React.ComponentProps<typeof Switch> & { label?: string };
const LabelledToggler: React.FC<Props> = ({
  isToggledOn,
  onToggle,
  disabled,
  label
}) => {
    return (
        <div className="bg-secondary-200 rounded-2xl px-5 py-3 max-w-[400px] mx-auto flex gap-4 flex-row justify-between items-center">
          <div className="flex flex-row gap-3 items-center ">
            <span className="w-9 h-9 bg-sky-100 rounded-full p-2 flex items-center justify-center">
              📍
            </span>
            <p className="text-secondary-500 md:text-xl font-semibold">
              { label }
            </p>
          </div>
          <div className="mx-auto">
            <Switch
              isToggledOn={isToggledOn}
              onToggle={onToggle}
              disabled={disabled}
            />
          </div>
        </div>
      );
};

export default LabelledToggler;
