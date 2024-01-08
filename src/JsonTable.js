import React, { useState, useEffect } from "react";
import "./JsonTable.css";
import TableHeader from "./TableHeader";
import JsonTableRow from "./JsonTableRow";
import SumRow from "./SumRow";

import { sortData } from "./tableUtils";

const JsonTable = ({ jsonData }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [showNounsTokensGroup, setShowNounsTokensGroup] = useState(false);
  const [showWalletsGroup, setShowWalletsGroup] = useState(false);
  const [showTxGroup, setShowTxGroup] = useState(false);

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
    return data.filter((row) => {
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
              // If column data is an array, check if any filter value is included
              if (!filterValues.some((value) => row[column].includes(value))) {
                return false;
              }
            } else {
              // If column data is a single value, check if it matches any filter value
              if (!filterValues.includes(row[column])) {
                return false;
              }
            }
          }
        }
      }
      return true;
    });
  };
  // Render the table rows based on applied filters
  const filteredData = getFilteredData();
  //--------------------------------------------------------------------------
  const handleSort = (columnName) => {
    setData((prevData) => {
      const newData = sortData(prevData, columnName, sortOrder);
      setSortColumn(columnName);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      return newData;
    });
  };
  //--------------------------------------------------------------------------
  const toggleNounsTokensGroup = () => setShowNounsTokensGroup((prev) => !prev);
  const toggleWalletsGroup = () => setShowWalletsGroup((prev) => !prev);
  const toggleTxGroup = () => setShowTxGroup((prev) => !prev);

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
            showTxGroup={showTxGroup}
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JsonTable;
