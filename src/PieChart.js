import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, CategoryScale, Chart } from "chart.js";

// Register the necessary components for Pie chart
Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

const PieChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          // Define colors for each segment
          "rgba(13, 146, 77, 0.85)", //green
          "rgba(110, 110, 110, 0.85)", // grey
          "rgba(206, 37, 71, 0.85)", //red vivid
          "rgba(232, 74, 106, 0.85)", // red pale
          "rgba(0, 0, 0, 0.85)", //black
          "rgba(50, 50, 50, 0.85)", //grey
          // ... add more colors as needed
        ],
        hoverBackgroundColor: [
          "rgba(13, 146, 77, 1)",
          "rgba(110, 110, 110, 1)",
          "rgba(206, 37, 71, 1)",
          "rgba(232, 74, 106, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(50, 50, 50, 1)",
        ],
        borderWidth: 0, // Ensure this is set to 0 or omitted
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

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
