import React from "react";
import "./NTChart.css";

const NTChart2 = ({ forValue, againstValue, abstainValue }) => {
  // Find the highest value among For, Against, and Abstain
  const maxValue = Math.max(forValue, againstValue, abstainValue);

  // Calculate the percentage of each value relative to the max value
  const forPercentage = (forValue / maxValue) * 100 * 1;
  const againstPercentage = (againstValue / maxValue) * 100 * 1;
  const abstainPercentage = (abstainValue / maxValue) * 100 * 1;

  return (
    <div className="nt-chart">
      {/* For bar */}
      <div className="bar">
        <div
          className="stacked-bar for"
          style={{
            width: forPercentage, // Set width as a percentage
            background: "rgb(7, 186, 116, 0.85)",
          }}
        ></div>
        <div className="label">{forValue}</div>
      </div>

      {/* Against bar */}
      <div className="bar">
        <div
          className="stacked-bar against"
          style={{
            width: againstPercentage, // Set width as a percentage
            background: "rgb(241,46,92, 0.85)",
          }}
        ></div>
        <div className="label">{againstValue}</div>
      </div>

      {/* Abstain bar */}
      <div className="bar">
        <div
          className="stacked-bar abstain"
          style={{
            width: abstainPercentage, // Set width as a percentage
            background: "rgb(130, 137, 134, 0.85)",
          }}
        ></div>
        <div className="label">{abstainValue}</div>
      </div>
    </div>
  );
};

export default NTChart2;
