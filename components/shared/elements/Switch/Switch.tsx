import React, { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import cn from "clsx";

interface Props {
  label?: React.ReactNode;
  disabled?: boolean;
  isToggledOn?: boolean;
  onToggle?: (toggled: boolean) => void | Promise<void>;
}

const Switch = ({ isToggledOn, onToggle, disabled, label }: Props) => {
  const id = useId();

  const handleSwitch = async () => {
    if (disabled) return;
    await onToggle?.(!isToggledOn);
  };

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            disabled && "opacity-50 text-gray-400"
          )}
        >
          {label}
        </label>
      )}
      <div className={cn("relative rounded-3xl w-11 h-6")}>
        <input
          id={id}
          type="button"
          onClick={handleSwitch}
          className={cn(
            "absolute border border-gray-400 rounded-3xl w-11 h-6 bg-gray-200 transition-[background]",
            { "bg-primary-300": isToggledOn },
            !disabled && "cursor-pointer",
            disabled && "opacity-50 border-slate-300 cursor-not-allowed"
          )}
        />
        <div
          className={cn("w-full h-full rounded-3xl p-1 flex items-center", {
            "justify-end": isToggledOn,
          })}
        >
          <motion.div
            layout={!disabled}
            className="w-4 h-4 rounded-full bg-white relative pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

const UncontrolledSwitch = ({
  isToggledOn,
  onToggle,
  disabled,
  label,
}: Props) => {
  const [_isToggledOn, _setIsToggledOn] = useState(isToggledOn ?? false);
  const id = useId();

  const handleSwitch = async () => {
    if (disabled) return;
    _setIsToggledOn(!_isToggledOn);
    await onToggle?.(!isToggledOn);
  };

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            disabled && "opacity-50 text-gray-400"
          )}
        >
          {label}
        </label>
      )}
      <div className={cn("relative rounded-3xl w-11 h-6")}>
        <input
          id={id}
          type="button"
          onClick={handleSwitch}
          className={cn(
            "absolute border border-gray-400 rounded-3xl w-11 h-6 bg-gray-200 transition-[background]",
            { "bg-primary-300": _isToggledOn },
            !disabled && "cursor-pointer",
            disabled && "opacity-50 border-slate-300 cursor-not-allowed"
          )}
        />
        <div
          className={cn("w-full h-full rounded-3xl p-1 flex items-center", {
            "justify-end": _isToggledOn,
          })}
        >
          <motion.div
            initial={false}
            layout={!disabled}
            className="w-4 h-4 rounded-full bg-white relative pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export { Switch, UncontrolledSwitch };
