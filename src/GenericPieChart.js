// GenericPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, CategoryScale, Chart } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

const GenericPieChart = ({ labels, data, title, colors }) => {
  const adjustOpacity = (color, opacity) => {
    return color.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`);
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors.map((color) => adjustOpacity(color, 0.85)),
        hoverBackgroundColor: colors.map((color) => adjustOpacity(color, 1)),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Ensure legend is not displayed
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          // This function allows you to add to the tooltip text
          afterBody: (tooltipItems) => {
            // Calculate the total of all data points
            const total = data.reduce((acc, value) => acc + value, 0);
            // Calculate and return the percentage of the current slice
            const percentage = (
              (data[tooltipItems[0].dataIndex] / total) *
              100
            ).toFixed(2);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <div className="pie-chart-diagram">
        <Pie data={chartData} options={options} />
      </div>
      <div className="pie-title">
        <a>{title}</a>
      </div>
    </div>
  );
};

export default GenericPieChart;
