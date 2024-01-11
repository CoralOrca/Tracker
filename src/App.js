//App.js
import "./App.css";
import React, { useState } from "react";
import JsonTable from "./JsonTable";
import jsonData from "./OnChain.json"; // Import your JSON file
import logoSvg from "./magnifierNoun.svg"; // Replace with the path to your SVG file
import styled, { createGlobalStyle } from "styled-components";
import PieChart from "./PieChart";
import PieChartSucceeded from "./PieChartSucceeded";
import PieChartCategory from "./PieChartCategory";
import {
  processDataForPieChart,
  processDataForSucceededProposalStatusPieChart,
  processDataCategoryForPieChart,
} from "./tableUtils";

import MyP5Component from "./MyP5Component";

const GlobalStyle = createGlobalStyle`
`;

const App = () => {
  const { labels, data } = processDataForPieChart(jsonData);
  const { labels2, data2, totalCosts } =
    processDataForSucceededProposalStatusPieChart(jsonData);
  const { labels3, data3 } = processDataCategoryForPieChart(jsonData);

  const [mainContentKey, setMainContentKey] = useState(0);

  const handleRefreshClick = () => {
    // Update the key to trigger re-render of the main content
    setMainContentKey((prevKey) => prevKey + 1);
  };

  // Count the number of 'Succeeded' outcomes
  const succeededCount = jsonData.filter(
    (item) => item.Outcome === "Succeeded"
  ).length;

  return (
    <div className="App">
      <header className="App-header">
        <div className="Refresh-icon" onClick={handleRefreshClick}>
          <MyP5Component />
        </div>

        <div className="header-right">
          <div className="built-by">
            Prototype by{" "}
            <a
              href="https://twitter.com/coralorca"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coralorca
            </a>{" "}
            for Nouns.
          </div>
          <div className="data-from">
            Inspired by{" "}
            <a
              href="https://maty-eth.notion.site/maty-eth/Proposal-Dashboard-39838dbdffa84184a436d4b562aaf55d"
              target="_blank"
              rel="noopener noreferrer"
            >
              proposals.wtf{" "}
            </a>
          </div>
          <div className="data-from">
            Data from{" "}
            <a
              href="https://twitter.com/matyETH"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maty
            </a>
            , {/* Replace # with Maty's URL */}
            <a
              href="https://www.updates.wtf/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mrtn
            </a>
            , and
            <a
              href="https://twitter.com/coralorca"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Coralorca
            </a>
          </div>

          <div class="pie-parent-container">
            <div className="pie-chart-container">
              <div className="pie-chart-diagram">
                <PieChart labels={labels} data={data} />
              </div>
              <div className="pie-title">
                <a>{jsonData.length} proposals</a>
              </div>
            </div>

            <div className="pie-chart-container">
              <div className="pie-chart-diagram">
                <PieChartSucceeded labels={labels2} data={data2} />
              </div>
              <div className="pie-title">
                <a>
                  {" "}
                  {succeededCount} passed representing {totalCosts}${" "}
                </a>
              </div>
            </div>

            <div className="pie-chart-container">
              <div className="pie-chart-diagram">
                <PieChartCategory labels={labels3} data={data3} />
              </div>
              <div className="pie-title">
                <a>Categories</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main key={mainContentKey}>
        <div className="App-content">
          <JsonTable jsonData={jsonData} />
        </div>
      </main>
      <footer className="App-footer">
        <p>⌐◨-◨ 2024 by Coralorca. Zero rights reserved.</p>
        {/* Add more content here as needed */}
      </footer>
    </div>
  );
};

export default App;
