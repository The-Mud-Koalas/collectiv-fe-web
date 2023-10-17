import React from "react";

const ChartContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-[2px] 2xl:w-[600px] w-[min(100%,_500px)] rounded-lg border-primary-700 h-fit flex flex-col items-center aspect-video py-2">
      <p></p>
      {children}
    </div>
  );
};

export default ChartContainer;
