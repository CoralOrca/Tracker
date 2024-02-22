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
  const [sortOrder, setSortOrder] = useState("asc");
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

  // Utility function to parse the search term
  const parseSearchTerm = (searchTerm) => {
    const parts = searchTerm.split(/\s+/); // Split by whitespace to get parts
    const criteria = {
      fields: {}, // Object to hold specific field searches
      general: [], // Array to hold general search terms
    };

    parts.forEach((part) => {
      if (part.includes(":")) {
        const [field, value] = part.split(":");
        if (criteria.fields[field]) {
          criteria.fields[field].push(value.toLowerCase());
        } else {
          criteria.fields[field] = [value.toLowerCase()];
        }
      } else {
        criteria.general.push(part.toLowerCase());
      }
    });

    return criteria;
  };

  const getFilteredData = () => {
    // Parse the search term to get structured search criteria
    const { fields, general } = parseSearchTerm(searchTerm);

    let filteredData = data.filter((row) => {
      // Apply filters first
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

      // Apply advanced search logic
      const fieldCriteriaMet = Object.keys(fields).every((field) =>
        fields[field].some(
          (value) =>
            row[field] && row[field].toString().toLowerCase().includes(value)
        )
      );

      const generalCriteriaMet =
        general.length === 0 ||
        general.every((term) =>
          Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(term)
          )
        );

      return fieldCriteriaMet && generalCriteriaMet;
    });

    return filteredData;
  };

  //------------------------------------------------------------------------------

  const handleSort = (columnName) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setData((prevData) => sortData(prevData, columnName, newSortOrder));

    // Always update the sortColumn
    setSortColumn(columnName);
  };

  //--------------------------------------------------------------------------
  const toggleNounsTokensGroup = () => setShowNounsTokensGroup((prev) => !prev);
  const toggleWalletsGroup = () => setShowWalletsGroup((prev) => !prev);
  const toggleTxGroup = () => setShowTxGroup((prev) => !prev);
  const toggleCostsGroup = () => setShowCostsGroup((prev) => !prev);

  // Render the table rows based on applied filters
  const filteredData = getFilteredData();

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
