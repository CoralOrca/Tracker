import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, CategoryScale, Chart } from "chart.js";

// Register the necessary components for Pie chart
Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

const PieChartCategory = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          // Define colors for each segment
          "rgba(40, 2, 146,0.85)",
          "rgba(25, 41, 244,0.85)",
          "rgba(66, 67, 248,0.85)",
          "rgba(57, 94, 209, 0.85)",
          "rgba(37, 78, 251, 0.85)",
          "rgba(0, 73, 156, 0.85)",
          "rgba(0, 121, 252, 0.85)",
          "rgba(35, 84, 118, 0.85)",
          "rgba(25, 41, 244, 0.85)",
          "rgba(30, 52, 69, 0.85)",
        ],
        hoverBackgroundColor: [
          "rgba(40, 2, 146,1)",
          "rgba(25, 41, 244,1)",
          "rgba(66, 67, 248,1)",
          "rgba(57, 94, 209, 1)",
          "rgba(37, 78, 251, 1)",
          "rgba(0, 73, 156, 1)",
          "rgba(0, 121, 252,1)",
          "rgba(35, 84, 118, 1)",
          "rgba(25, 41, 244, 1)",
          "rgba(30, 52, 69, 1)",
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

export default PieChartCategory;
