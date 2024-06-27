import React from "react";
import { VictoryPie  } from 'victory';
function PieChart({data})
{
    const chartData = data.map(item => ({
        x: item.name,
        y: item.count
    }));

    const colors = [
        "rgb(122, 178, 178)",
        "rgb(102, 158, 158)",
        "rgb(142, 198, 198)",
        "rgb(162, 218, 218)",
        "rgb(82, 138, 138)",
        "rgb(52, 108, 108)",
        "rgb(192, 248, 248)",
        "rgb(100, 138, 138)",
        "rgb(52, 120, 108)",
        "rgb(192, 1, 248)"
      ];

    return (
        <div>
            <VictoryPie
                data={chartData}
                innerRadius={100} 
                colorScale={colors}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
            />
        </div>
    )
}

export default PieChart;