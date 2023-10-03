import React from "react";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";

interface StatusPillProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

const StatusPill = (props: StatusPillProps) => {
  const { status, ...rest } = props;
  
  const variants = {
    "[&>div]:bg-primary-500 bg-primary-200 text-primary-700": status === "ongoing",
    "[&>div]:bg-secondary-500 bg-secondary-200 text-secondary-400": status === "completed",
    "[&>div]:bg-danger-500 bg-danger-200 text-danger-100": status === "cancelled",
    "[&>div]:bg-gray-600 bg-gray-300": status === "scheduled",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl py-[3px] px-2 text-sm font-semibold",
        inter.className,
        variants
      )}
      {...rest}
    >   
        <div className="w-2 h-2 rounded-full" />
        <span>
            {status.charAt(0).toUpperCase() + status.substring(1)}
        </span>
    </div>
  );
};

export default StatusPill;
