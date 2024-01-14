import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, CategoryScale, Chart } from "chart.js";

// Register the necessary components for Pie chart
Chart.register(ArcElement, Tooltip, Legend, CategoryScale);

const PieChartSucceeded = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(58, 172, 155, 0.85)", // pale green
          "rgba(13, 146, 77, 0.85)", // green

          "rgba(119, 119, 119, 0.85)", //red vivid
          "rgba(232, 74, 106, 0.85)", // red pale
          "rgba(255, 160, 18, 0.85)", //orange
          "rgba(50, 50, 50, 0.85)", //grey
        ],
        hoverBackgroundColor: [
          "rgba(58, 172, 155, 1)", // pale green
          "rgba(13, 146, 77, 1)", // green

          "rgba(119, 119, 119,1)", //red vivid
          "rgba(232, 74, 106, 1)", // red pale
          "rgba(255, 160, 18, 1)", //orange
          "rgba(50, 50, 50, 1)", //grey
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

export default PieChartSucceeded;
