//App.js
import "./App.css";
import React, { useState } from "react";
import JsonTable from "./JsonTable";
import jsonData from "./OnChain.json"; // Import your JSON file
import GenericPieChart from "./GenericPieChart";
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
            for{" "}
            <a
              href="https://nouns.wtf/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nouns.
            </a>
          </div>
          <div className="data-from">
            Inspired by{}
            <a
              href="https://maty-eth.notion.site/maty-eth/Proposal-Dashboard-39838dbdffa84184a436d4b562aaf55d"
              target="_blank"
              rel="noopener noreferrer"
            >
              proposals.wtf{}
            </a>
          </div>
          <div className="data-from">
            Data from{}
            <a
              href="https://twitter.com/matyETH"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maty
            </a>
            , {}
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
              {}
              Coralorca
            </a>
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
              title={`${succeededCount} passed representing ${totalCosts}$`}
              colors={colorsForSecondChart}
            />
            <GenericPieChart
              labels={labels3}
              data={data3}
              title="Categories"
              colors={colorsForThirdChart}
            />
          </div>
        </div>
        <div className="search-wrapper">
          <div>
            <input
              className="search-widget"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      <main key={mainContentKey}>
        <div className="App-content">
          <JsonTable jsonData={jsonData} searchTerm={searchTerm} />
        </div>
      </main>
      <footer className="App-footer">
        <p>⌐◨-◨ 2024 by Coralorca. Zero rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
