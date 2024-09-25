import * as React from "react";
import { useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc() {

    const [chartData, setChartData] = React.useState([]);

    useEffect(() => setChartData([
      {
        label: "Ilyda Chua",
        value: 12,
      },
      {
        label: "Skibidi",
        value: 15,
      },
      {
        label: "Ohio",
        value: 3,
      },
      {
        label: "Quandale",
        value: 14,
      },
      {
        label: "BlueTie",
        value: 3,
      },
      {
        label: "Nugget",
        value: 9,
      },
      {
        label: "CostCo",
        value: 3,
      },
      {
        label: "FrankOcean",
        value: 2,
      },
      {
        label: "Tyler",
        value: 2,
      },
      {
        label: "SZA",
        value: 2,
      },
    ]), []);

  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={400}
      width={600}
    />
  );
}
