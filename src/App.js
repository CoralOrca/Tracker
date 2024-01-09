//App.js
import "./App.css";
import React, { useState } from "react";
import JsonTable from "./JsonTable";
import jsonData from "./OnChain.json"; // Import your JSON file
import logoSvg from "./magnifierNoun.svg"; // Replace with the path to your SVG file
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
`;

function App() {
  const [mainContentKey, setMainContentKey] = useState(0);

  const handleRefreshClick = () => {
    // Update the key to trigger re-render of the main content
    setMainContentKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <div className="Refresh-icon" onClick={handleRefreshClick}>
            <img
              className="Logo-header"
              src={logoSvg}
              alt="Your Logo Alt Text"
            />
          </div>
        </div>

        <div className="header-right">
          <div className="built-by">
            Prototype built by{" "}
            <a
              href="https://twitter.com/coralorca"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coralorca
            </a>{" "}
            for Nouns. Inspired by{" "}
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
        </div>
      </header>
      <main key={mainContentKey}>
        <div className="App-content">
          <JsonTable jsonData={jsonData} />
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2024 by Coralorca. Zero rights reserved ⌐◨-◨.</p>
        {/* Add more content here as needed */}
      </footer>
    </div>
  );
}

export default App;
