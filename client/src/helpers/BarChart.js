import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

function BarChart({ data }) {
  // Transform the data to match VictoryBar requirements
  const chartData = data.map(item => ({
    x: item.name,
    y: item.count
  }));

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={40}
      >
        <VictoryAxis
          // Customize the x-axis
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 20, padding: 5 }
          }}
          tickLabelComponent={<VictoryLabel angle={10} padding={10} />}
        />
        <VictoryAxis
          dependentAxis
          // Customize the y-axis
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 20, padding: 40 },
            grid: { stroke: (tick) => tick > 0.5 ? "grey" : "transparent" },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 15, padding: 5 }
          }}
        />
        <VictoryBar
          data={chartData}
          style={{
            data: { fill: "rgb(122, 178, 178)" },
            labels: { fontSize: 15, fill: "#333" }
          }}
          labels={({ datum }) => datum.y}
          barRatio={0.8}
        />
      </VictoryChart>
    </div>
  );
}

export default BarChart;
