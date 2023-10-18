import React from "react";
import { MayHaveLabel, ResponsivePie } from "@nivo/pie";
import { inter } from "@/utils/constants/fonts";

const PieChart = ({
  data,
  bigText,
  margin,
  hideLegends,
  val,
}: {
  data: MayHaveLabel[];
  val?: (val: MayHaveLabel) => string;
  bigText?: boolean;
  margin?: Partial<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>;
  hideLegends?: boolean;
}) => {
  return (
    <ResponsivePie
      data={data}
      margin={margin ?? { top: 0, right: 0, bottom: 0, left: 0 }}
      theme={{
        fontSize: 12,
        fontFamily: inter.style.fontFamily,
        labels: {
          text: {
            fontWeight: 800,
            fontSize: bigText
              ? "clamp(14px, 1.5vw, 24px)"
              : "clamp(10px, 1vw, 14px)",
          },
        },
        legends: {
          text: {
            fontWeight: "bold",
            fontSize: bigText
              ? "clamp(14px, 1.5vw, 20px)"
              : "clamp(10px, 0.8vw, 12px)",
          },
        },
      }}
      arcLabel={val}
      colors={{ scheme: "pink_yellowGreen" }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      enableArcLinkLabels={false}
      // arcLinkLabelsSkipAngle={10}
      // arcLinkLabelsTextColor="#333333"
      // arcLinkLabelsThickness={2}
      // arcLabelsSkipAngle={10}
      // arcLinkLabelsColor={{ from: "color" }}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 4]],
      }}
      legends={
        !hideLegends
          ? [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 50,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default PieChart;
