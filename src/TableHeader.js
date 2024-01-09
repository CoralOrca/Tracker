// TableHeader.js
import React, { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterFill,
  RiFilterOffFill,
  RiFilterLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import "./TableHeader.css";
import FilterPopup from "./FilterPopup";
import {
  excludeFilterForColumns,
  invisibleColumns,
  noSortingColumns,
  backgroundHeader1,
  backgroundHeader2,
  nounsTokenColumns,
  walletsColumns,
  txColumns,
} from "./TableConfig";

const TableHeader = ({
  columns,
  handleSort,
  sortColumn,
  sortOrder,
  showNounsTokensGroup,
  showWalletsGroup,
  showTxGroup,
  toggleNounsTokensGroup,
  toggleWalletsGroup,
  toggleTxGroup,
  tableData,
  activeFilters,
  setActiveFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);

  const toggleFilterPopup = (columnName) => {
    setIsFilterOpen(!isFilterOpen);
    setActiveFilterColumn(columnName);
  };

  // Function to get data for a specific column
  const getColumnData = (columnName) => {
    return tableData.map((row) => row[columnName]);
  };

  return (
    <>
      <thead className="thead-header">
        <tr>
          {columns.map((column) => {
            // Check if the column is "#" to apply the special class

            const hasBackgroundHeader1 = applyBackgroundHeader1(column);
            const hasBackgroundHeader2 = applyBackground2(column);

            if (invisibleColumns.includes(column)) {
              return null; // Skip rendering
            }

            const filterIsActive =
              activeFilters[column] && activeFilters[column].length > 0;

            if (
              (nounsTokenColumns.includes(column) && !showNounsTokensGroup) ||
              (walletsColumns.includes(column) && !showWalletsGroup) ||
              (txColumns.includes(column) && !showTxGroup)
            ) {
              return null;
            }

            const isXSmallColumn =
              column === "#" || column === "Tx" || column === "Block";

            const isTitleColumn =
              column === "Proposal title" ||
              column === "Transactions details" ||
              column === "Transactions Notes" ||
              column === "Proposer" ||
              column === "Sponsor" ||
              column === "Team";

            const isSmallColumn =
              column === "Stream" ||
              column === "Updates" ||
              column === "Nouns Voting" ||
              column === "Nouns For" ||
              column === "Nouns Against" ||
              column === "Nouns Abstain" ||
              column === "Quorum" ||
              column === "Nouns Turnout" ||
              column === "Wallets Voting" ||
              column === "Wallets For" ||
              column === "Wallets Against" ||
              column === "Wallets Abstain" ||
              column === "Wallets Turnout" ||
              column === "Updates Nb";

            const isFinancialColumn =
              column === "ETH" ||
              column === "USDC" ||
              column === "Total value" ||
              column === "True cost" ||
              column === "Nouns ID" ||
              column === "Includes Nouns";

            const isMediumColumn =
              column === "Category" || column === "Former candidate";

            const isXMediumColumn =
              column === "Proposal status" || column === "Outcome";

            const isLargeColumn =
              column === "Nouns vote" || column === "Wallets vote";

            // Apply the appropriate class based on the column
            let columnClass = "";

            if (isXSmallColumn) {
              columnClass = "col-xs";
            }

            if (isTitleColumn) {
              columnClass = "col-title";
            }

            if (isSmallColumn) {
              columnClass = "col-small";
            }

            if (isMediumColumn) {
              columnClass = "col-medium";
            }
            if (isXMediumColumn) {
              columnClass = "col-Xmedium";
            }

            if (isLargeColumn) {
              columnClass = "col-large";
            }

            if (isFinancialColumn) {
              columnClass = "col-financial-header";
            }
            return (
              <th
                className={`header-row ${columnClass} ${
                  hasBackgroundHeader1 ? "bg-Header1" : ""
                } ${hasBackgroundHeader2 ? "bg-Header2" : ""}`}
                key={column}
              >
                <div className="header-cell">
                  {column}

                  {!excludeFilterForColumns.includes(column) && (
                    <button
                      style={{ float: "right" }}
                      onClick={() => toggleFilterPopup(column)}
                    >
                      {filterIsActive ? (
                        <RiFilterFill style={{ color: "black" }} />
                      ) : (
                        <RiFilterLine style={{ color: "black" }} />
                      )}
                    </button>
                  )}

                  {column === "Nouns vote" && (
                    <button
                      style={{ float: "right" }}
                      onClick={toggleNounsTokensGroup}
                    >
                      {showNounsTokensGroup ? (
                        <RiArrowLeftSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      ) : (
                        <RiArrowRightSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      )}
                    </button>
                  )}

                  {column === "Wallets vote" && (
                    <button
                      style={{ float: "right" }}
                      onClick={toggleWalletsGroup}
                    >
                      {showWalletsGroup ? (
                        <RiArrowLeftSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      ) : (
                        <RiArrowRightSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      )}
                    </button>
                  )}

                  {column === "Tx" && (
                    <button style={{ float: "right" }} onClick={toggleTxGroup}>
                      {showTxGroup ? (
                        <RiArrowLeftSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      ) : (
                        <RiArrowRightSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      )}
                    </button>
                  )}

                  {!noSortingColumns.includes(column) && (
                    <button onClick={() => handleSort(column)}>
                      {sortColumn === column ? (
                        sortOrder === "asc" ? (
                          <RiArrowDownSLine
                            style={{
                              fontSize: "large",
                              color: "black",
                            }}
                          />
                        ) : (
                          <RiArrowUpSLine
                            style={{
                              fontSize: "large",
                              color: "black",
                            }}
                          />
                        )
                      ) : (
                        <RiArrowDownSLine
                          style={{
                            fontSize: "large",
                            color: "black",
                          }}
                        />
                      )}
                    </button>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      {isFilterOpen && (
        <FilterPopup
          columnData={getColumnData(activeFilterColumn)}
          selectedFilters={activeFilters[activeFilterColumn] || []}
          setSelectedFilters={(filters) =>
            setActiveFilters({
              ...activeFilters,
              [activeFilterColumn]: filters,
            })
          }
          onClose={() => setIsFilterOpen(false)}
          columnName={activeFilterColumn} // Pass the column name
        />
      )}
    </>
  );
};

const applyBackgroundHeader1 = (columnName) => {
  return backgroundHeader1.includes(columnName);
};

const applyBackground2 = (columnName) => {
  return backgroundHeader2.includes(columnName);
};

export default TableHeader;
