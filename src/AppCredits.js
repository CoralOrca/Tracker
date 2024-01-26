import React from "react";

function AppCredits() {
  return (
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
        <a href="https://nouns.wtf/" target="_blank" rel="noopener noreferrer">
          Nouns
        </a>
      </div>
      <div className="data-from">
        Inspired by{" "}
        <a
          href="https://maty-eth.notion.site/maty-eth/Proposal-Dashboard-39838dbdffa84184a436d4b562aaf55d"
          target="_blank"
          rel="noopener noreferrer"
        >
          Proposals.wtf{}
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
          {" "}
          Coralorca
        </a>
      </div>
    </div>
  );
}

export default AppCredits;
