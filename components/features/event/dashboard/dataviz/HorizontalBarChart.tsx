import { inter } from "@/utils/constants/fonts";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import React from "react";

const HorizontalBarChart = ({
  data,
  indexBy,
  keys,
  hideLegends,
  axisLeft,
  margin,
}: {
  data: BarDatum[];
  indexBy: string;
  keys: string[];
  hideLegends?: boolean;
  axisLeft?: (val: any) => any;
  margin?: Partial<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>;
}) => {
  return (
    <ResponsiveBar
      
      data={data}
      enableGridY={false}
      theme={{
        fontFamily: inter.style.fontFamily,
        labels: { text: { fontSize: "80%", fontWeight: "bold" } },
      }}
      labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      maxValue={"auto"}
      keys={keys}
      indexBy={indexBy}
      // @ts-expect-error
      axisLeft={
        axisLeft
          ? axisLeft
          : {
              format: (e) => {
                if (Math.floor(e) === e) {
                  return e;
                }
                return "";
              },
            }
      }
      // @ts-expect-error
      label={(d) => (d.value === 0 ? "" : d.value?.toString())}
      margin={margin ?? { top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "pink_yellowGreen" }}
      valueScale={{ type: "linear" }}
      layout="horizontal"
      legends={
        hideLegends
          ? undefined
          : [
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default HorizontalBarChart;
