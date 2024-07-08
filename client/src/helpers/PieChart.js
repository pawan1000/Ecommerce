import React from "react";
import { VictoryPie, VictoryLabel } from 'victory';

function PieChart({ data }) {
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
        <div style={{ width: '100%', height: '100%', padding: '20px' }}>
            <VictoryPie
                data={chartData}
                innerRadius={100}
                colorScale={colors}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                labelComponent={<VictoryLabel angle={0} />}
                style={{
                    labels: {
                        fontSize: 10, // Adjust font size if needed
                        padding: 10,
                        fill: "black" // Set label color to ensure visibility
                    }
                }}
                padding={{ top: 20, bottom: 20, left: 50, right: 50 }}
            />
        </div>
    );
}

export default PieChart;
