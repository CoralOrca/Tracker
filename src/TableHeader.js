// TableHeader.js
import React, { useState } from "react";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiFilterFill,
  RiFilterOffLine,
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
  costsColumns,
} from "./TableConfig";

import getColumnClassUtils from "./GetColumnClassUtils";

const TableHeader = ({
  columns,
  handleSort,
  sortColumn,
  sortOrder,
  showNounsTokensGroup,
  showWalletsGroup,
  showTxGroup,
  showCostsGroup,
  toggleNounsTokensGroup,
  toggleWalletsGroup,
  toggleTxGroup,
  toggleCostsGroup,
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
              (txColumns.includes(column) && !showTxGroup) ||
              (costsColumns.includes(column) && !showCostsGroup)
            ) {
              return null;
            }

            let columnClass = getColumnClassUtils(column); // Use the utility function

            // Function to determine if the column should have the triangle and border
            const shouldShowTriangle = (colName) => {
              switch (colName) {
                case "Tx":
                  return showTxGroup;
                case "True cost":
                  return showCostsGroup;
                case "Nouns vote":
                  return showNounsTokensGroup;
                case "Wallets vote":
                  return showWalletsGroup;
                default:
                  return false;
              }
            };

            return (
              <th
                className={`header-row ${columnClass} ${
                  hasBackgroundHeader1 ? "bg-Header1" : ""
                } ${hasBackgroundHeader2 ? "bg-Header2" : ""} ${
                  ["Tx", "True cost", "Nouns vote", "Wallets vote"].includes(
                    column
                  )
                    ? shouldShowTriangle(column)
                      ? "border-left"
                      : "border-right"
                    : ""
                }`}
                key={column}
              >
                <div className="header-cell">
                  <div>
                    <div className="header-title-wraper">
                      {/* filtering sabliers*/}
                      {!excludeFilterForColumns.includes(column) && (
                        <button
                          onClick={() => toggleFilterPopup(column)}
                          className="filter-button"
                          style={{ marginLeft: "0px" }} // Adjust spacing as needed
                        >
                          {filterIsActive ? (
                            <RiFilterFill
                              style={{
                                fontSize: "0.9rem",
                                color: "#4b5259",
                                transform: "translateY(2px)",
                              }}
                            />
                          ) : (
                            <RiFilterOffLine
                              style={{
                                fontSize: "0.9rem",
                                color: "#4b5259",
                                transform: "translateY(2px)",
                                margin: "2px",
                              }}
                            />
                          )}
                        </button>
                      )}

                      {/* sorting arrows*/}
                      {!noSortingColumns.includes(column) && (
                        <button
                          onClick={() => handleSort(column)}
                          className="sort-button"
                        >
                          {sortColumn === column ? (
                            sortOrder === "asc" ? (
                              <RiArrowDownSFill
                                style={{
                                  fontSize: "1.5rem",
                                  color: "#4b5259",
                                }}
                              />
                            ) : (
                              <RiArrowUpSFill
                                style={{
                                  fontSize: "1.5rem",
                                  color: "#4b5259",
                                }}
                              />
                            )
                          ) : (
                            <RiArrowDownSFill
                              style={{
                                fontSize: "1.5rem",
                                color: "#4b5259",
                              }}
                            />
                          )}
                        </button>
                      )}

                      <div className="title-wrapper">
                        <span className="header-title">{column}</span>
                      </div>
                    </div>

                    {["Tx", "True cost", "Nouns vote", "Wallets vote"].includes(
                      column
                    ) && (
                      <span
                        style={{ cursor: "pointer" }}
                        className={`triangle-indicator ${
                          shouldShowTriangle(column)
                            ? "triangle-left"
                            : "triangle-right"
                        }`}
                        onClick={() => {
                          switch (column) {
                            case "Tx":
                              toggleTxGroup();
                              break;
                            case "True cost":
                              toggleCostsGroup();
                              break;
                            case "Nouns vote":
                              toggleNounsTokensGroup();
                              break;
                            case "Wallets vote":
                              toggleWalletsGroup();
                              break;
                            default:
                              break;
                          }
                        }}
                      ></span>
                    )}
                  </div>
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
