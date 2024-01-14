import React, { useState, useEffect } from "react";
import "./JsonTable.css";
import TableHeader from "./TableHeader";
import JsonTableRow from "./JsonTableRow";
import SumRow from "./SumRow";

import { sortData } from "./tableUtils";

const JsonTable = ({ jsonData, searchTerm }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [showNounsTokensGroup, setShowNounsTokensGroup] = useState(false);
  const [showWalletsGroup, setShowWalletsGroup] = useState(false);
  const [showTxGroup, setShowTxGroup] = useState(false);
  const [showCostsGroup, setShowCostsGroup] = useState(false);

  // Initialize with every filterable column having an empty array
  const [activeFilters, setActiveFilters] = useState({
    Nouns: [],
    Category: [],
    Outcome: [],
    Status: [],
    Proposer: [],
    Sponsor: [],
    Propdate: [],
    Team: [],
    Stream: [],
  });

  useEffect(() => {
    setData(jsonData);
    if (jsonData.length > 0) {
      setColumns(Object.keys(jsonData[0]));
    }
  }, [jsonData]);
  //--------------------------------------------------------------------------
  const getFilteredData = () => {
    // Apply filters first
    let filteredData = data.filter((row) => {
      for (const column in activeFilters) {
        const filterValues = activeFilters[column];
        if (filterValues.length > 0) {
          if (column === "Stream") {
            const transactions = row["Transactions details"] || [];
            const hasCreateStream = transactions.includes("createStream");
            if (filterValues.includes("Yes") && !hasCreateStream) return false;
            if (filterValues.includes("No") && hasCreateStream) return false;
          } else {
            if (Array.isArray(row[column])) {
              if (!filterValues.some((value) => row[column].includes(value))) {
                return false;
              }
            } else {
              if (!filterValues.includes(row[column])) {
                return false;
              }
            }
          }
        }
      }
      return true; // Keep this row if it passes all filters
    });

    // Then, apply search logic if there is a search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredData = filteredData.filter((row) => {
        return (
          row["#"].toString().toLowerCase().includes(searchLower) ||
          (row["Proposal title"] &&
            row["Proposal title"].toLowerCase().includes(searchLower)) ||
          (row["Proposer"] &&
            row["Proposer"].toLowerCase().includes(searchLower)) ||
          (row["Sponsor"] &&
            row["Sponsor"].toLowerCase().includes(searchLower)) ||
          (Array.isArray(row["Team"]) &&
            row["Team"].some((name) =>
              name.toLowerCase().includes(searchLower)
            ))
        );
      });
    }

    return filteredData;
  };

  // Render the table rows based on applied filters
  const filteredData = getFilteredData();
  //------------------------------------------------------------------------------
  const handleSort = (columnName) => {
    // Check if the clicked column is "#"
    if (columnName === "#") {
      // If it is, and the sortOrder is 'desc' or not set, set it directly to 'asc'
      if (sortOrder === "desc" || !sortOrder) {
        setSortOrder("asc");
        setData((prevData) => sortData(prevData, columnName, "asc"));
      } else {
        // If sortOrder is 'asc', change it to 'desc'
        setSortOrder("desc");
        setData((prevData) => sortData(prevData, columnName, "desc"));
      }
    } else {
      // For all other columns, toggle between 'asc' and 'desc'
      const newSortOrder = sortOrder === "asc" ? "desc" : "desc";
      setSortOrder(newSortOrder);
      setData((prevData) => sortData(prevData, columnName, newSortOrder));
    }

    // Always update the sortColumn
    setSortColumn(columnName);
  };

  //--------------------------------------------------------------------------
  const toggleNounsTokensGroup = () => setShowNounsTokensGroup((prev) => !prev);
  const toggleWalletsGroup = () => setShowWalletsGroup((prev) => !prev);
  const toggleTxGroup = () => setShowTxGroup((prev) => !prev);
  const toggleCostsGroup = () => setShowCostsGroup((prev) => !prev);

  return (
    <div>
      <div className="fixed-header">
        <table>
          <TableHeader
            columns={columns}
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            showNounsTokensGroup={showNounsTokensGroup}
            showWalletsGroup={showWalletsGroup}
            toggleNounsTokensGroup={toggleNounsTokensGroup}
            toggleWalletsGroup={toggleWalletsGroup}
            toggleTxGroup={toggleTxGroup}
            toggleCostsGroup={toggleCostsGroup}
            showTxGroup={showTxGroup}
            showCostsGroup={showCostsGroup}
            tableData={jsonData}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <SumRow
            filteredData={filteredData}
            columns={columns}
            showNounsTokensGroup={showNounsTokensGroup}
            showWalletsGroup={showWalletsGroup}
            showTxGroup={showTxGroup}
            showCostsGroup={showCostsGroup}
          />
        </table>
      </div>

      <div className="table-container">
        <table>
          <tbody>
            {filteredData.map((row, index) => (
              <JsonTableRow
                key={index}
                row={row}
                columns={columns}
                showNounsTokensGroup={showNounsTokensGroup}
                showWalletsGroup={showWalletsGroup}
                showTxGroup={showTxGroup}
                showCostsGroup={showCostsGroup}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JsonTable;
