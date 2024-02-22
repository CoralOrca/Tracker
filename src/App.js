//App.js
import "./App.css";
import React, { useState } from "react";
import JsonTable from "./JsonTable";
import jsonData from "./OnChain.json";
import GenericPieChart from "./GenericPieChart";
import AppCredits from "./AppCredits";

import {
  processDataAllPie,
  processDataForSucceededPie,
  processDataCategoryPie,
} from "./tableUtils";

import {
  colorsForFirstChart,
  colorsForSecondChart,
  colorsForThirdChart,
} from "./TableConfig";

import MyP5Component from "./MyP5Component";

const App = () => {
  const { labels, data } = processDataAllPie(jsonData);
  const { labels2, data2, totalCosts } = processDataForSucceededPie(jsonData);
  const { labels3, data3 } = processDataCategoryPie(jsonData);

  const [mainContentKey, setMainContentKey] = useState(0);

  const handleRefreshClick = () => {
    // Update the key to trigger re-render of the main content
    setMainContentKey((prevKey) => prevKey + 1);
  };

  // Count the number of 'Succeeded' outcomes
  const succeededCount = jsonData.filter(
    (item) => item.Outcome === "Succeeded"
  ).length;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-left-container">
          <div className="Refresh-icon" onClick={handleRefreshClick}>
            <MyP5Component />
          </div>
          <div className="search-wrapper">
            <input
              className="search-widget"
              type="text"
              placeholder="   Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div class="pie-parent-container">
          <GenericPieChart
            labels={labels}
            data={data}
            title={`${jsonData.length} proposals`}
            colors={colorsForFirstChart}
          />

          <GenericPieChart
            labels={labels2}
            data={data2}
            title={`${succeededCount} passed representing $${totalCosts}`}
            colors={colorsForSecondChart}
          />
          <GenericPieChart
            labels={labels3}
            data={data3}
            title="Categories"
            colors={colorsForThirdChart}
          />
        </div>
      </header>
      <main key={mainContentKey}>
        <div className="App-content">
          <JsonTable jsonData={jsonData} searchTerm={searchTerm} />
        </div>
      </main>
      <footer className="App-footer">
        <div>
          <AppCredits />
        </div>
        <p>⌐◨-◨ 2024 by Coralorca. Zero rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
