import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { inter } from "@/utils/constants/fonts";

const LineChart = ({ data }: { data: Serie[] }) => {
  return (
    <ResponsiveLine
      data={data}
      colors={{ scheme: "pink_yellowGreen" }}
      margin={{ top: 50,right: 60,  bottom: 50, left: 60 }}
      theme={{
        fontFamily: inter.style.fontFamily,
        fontSize: 14
      }}
      axisBottom={{ format: (d: number) => new Date(d).toDateString() }}
      axisLeft={{
        format: (e) => {
          if (Math.floor(e) === e) {
            return e;
          }
          return "";
        },
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        reverse: false,
      }}
      pointBorderWidth={2}
      pointSize={10}
      pointColor={"white"}
      pointBorderColor={{ from: "serieColor" }}
      enableSlices={"x"}

    />
  );
};

export default LineChart;
