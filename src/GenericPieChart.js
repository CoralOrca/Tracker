// GenericPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, CategoryScale, Chart } from "chart.js";

// Register the necessary components for Pie chart
Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

const GenericPieChart = ({ labels, data, title, colors }) => {
  // Function to adjust opacity of an RGB color
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
        display: false, // Ensure legend is displayed
        position: "bottom", // Position of legend, can be 'top', 'bottom', 'left', 'right'
      },
      tooltip: {
        enabled: true, // Enable tooltips
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
