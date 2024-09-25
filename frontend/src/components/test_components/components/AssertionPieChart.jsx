import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { colors, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Box } from '@mui/system';

export default function AssertionChart({info}) {

    const assertionData = info;
    const [chartData, setChartData] = React.useState([]);
    
    useEffect(() => {
      if (assertionData.length > 0) {
        let trueCount = 0;
        let falseCount = 0;

        assertionData.forEach((assertion) => {
          if (assertion.factCheck.includes("True")) {
            trueCount++;
          } else {
            falseCount++;
          }
        });

        const totalAssertions = trueCount + falseCount;
        const truePercentage = (trueCount / totalAssertions) * 100;

        console.log(`Number of True Assertions: ${trueCount}`);
        console.log(`Number of False Assertions: ${falseCount}`);
        console.log(
          `Percentage of True Assertions: ${truePercentage.toFixed(2)}%`
        );

        setChartData([
          { label: "True", value: trueCount, color: colors.green[500] },
          { label: "False", value: falseCount, color: colors.red[500] },
        ]);
      }
    }, [assertionData]);

  return (
    <Box>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={220}
        width={220}
        slotProps={{
          legend: {
            fontSize: 5,
          },
        }}
      />
    </Box>
  );
}