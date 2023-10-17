import React from "react";
import { MayHaveLabel, ResponsivePie } from "@nivo/pie";
import { inter } from "@/utils/constants/fonts";

const PieChart = ({ data }: { data: MayHaveLabel[] }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 15, right: 0, bottom: 70, left: 0 }}
      theme={{
        fontSize: 12,
        fontFamily: inter.style.fontFamily,
        labels: { text: { fontWeight: 500, fontSize: 'clamp(10px, 1vw, 14px)' } },
        legends: { text: { fontWeight: "bold", fontSize: 'clamp(10px, 0.8vw, 12px)' } }
      }}
      colors={{ scheme: "pink_yellowGreen" }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLabelsSkipAngle={10}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
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
      ]}
    />
  );
};

export default PieChart;
