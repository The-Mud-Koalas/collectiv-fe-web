import { inter } from "@/utils/constants/fonts";
import { ResponsiveBar, BarDatum } from "@nivo/bar";

const BarChart = ({
  data,
  indexBy,
  keys,
}: {
  data: BarDatum[];
  indexBy: string;
  keys: string[];
}) => {
  return (
    <ResponsiveBar
      data={data}
      enableGridY={false}
      theme={{
        fontFamily: inter.style.fontFamily,
        labels: { text: { fontSize: "100%", fontWeight: "bold" } },
      }}
      maxValue={"auto"}
      keys={keys}
      indexBy={indexBy}
      axisLeft={{
        format: (e) => {
          if (Math.floor(e) === e) {
            return e;
          }
          return "";
        },
      }}
      // @ts-expect-error
      label={(d) => d.value === 0 ? <tspan y="-15">{d.value}</tspan> : d.value?.toString()}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "pink_yellowGreen" }}
      valueScale={{ type: "linear" }}
      legends={[
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
      ]}
    />
  );
};

export default BarChart;
