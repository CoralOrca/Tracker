import React from "react";
import "./NTChart.css";

const NTChart = ({
  forValue,
  againstValue,
  abstainValue,
  quorumValue,
  totalValue,
}) => {
  // Find the highest value among For, Against, and Abstain
  const maxValue = Math.max(forValue, againstValue, abstainValue, quorumValue);

  // Calculate the percentage of each value relative to the max value
  const forPercentage = (forValue / maxValue) * 100 * 1;
  const againstPercentage = (againstValue / maxValue) * 100 * 1;
  const abstainPercentage = (abstainValue / maxValue) * 100 * 1;
  const quorumPercentage = (quorumValue / maxValue) * 100 * 1;

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
      {/* Other elements */}
      {quorumValue > 0 && (
        <div className="quorum-bar">
          <div
            className="quorum"
            style={{
              width: quorumPercentage, // Set width as a percentage
              background: "none",
              borderRight: "1px solid",
              borderColor: "rgb(90, 90, 90,0.5)",
              marginTop: "-40px",
              height: "40px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default NTChart;
