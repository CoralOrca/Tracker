import React from "react";
import {
  calculateColumnSum,
  countUniqueValues,
  countUniqueStringsInArrayOfArrays,
  sumIntegersInColumn,
  countCheckmarksInStream,
} from "./tableUtils";

import {
  invisibleColumns,
  nounsTokenColumns,
  walletsColumns,
  txColumns,
  costsColumns,
} from "./TableConfig";

const SumRow = ({
  filteredData,
  columns,
  showNounsTokensGroup,
  showWalletsGroup,
  showTxGroup,
  showCostsGroup,
}) => {
  //--------------------------------------------------------------------------
  // Function to count  array sizes in the "Nouns ID" column
  const sumArraySizesInId = (data) => {
    return data.reduce((totalSize, row) => {
      if (Array.isArray(row["Nouns ID"])) {
        return totalSize + row["Nouns ID"].length;
      }
      return totalSize;
    }, 0);
  };
  //--------------------------------------------------------------------------
  // Function to count array sizes in the "Transactions details" column
  const sumArraySizesInTx = (data) => {
    return data.reduce((totalSize, row) => {
      if (Array.isArray(row["Transactions details"])) {
        return totalSize + row["Transactions details"].length;
      }
      return totalSize;
    }, 0);
  };
  //--------------------------------------------------------------------------
  // Function to count "Yes" values in the "Updates" column
  const countYesInPropdate = (data) => {
    return data.reduce((count, row) => {
      if (row["Updates"] === "Yes") {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <tr className="sum-row">
      {columns.map((column) => {
        // Check if the column should be hidden based on group toggles or other conditions
        if (
          (nounsTokenColumns.includes(column) && !showNounsTokensGroup) ||
          (walletsColumns.includes(column) && !showWalletsGroup) ||
          (txColumns.includes(column) && !showTxGroup) ||
          (costsColumns.includes(column) && !showCostsGroup) ||
          invisibleColumns.includes(column)
        ) {
          return null;
        }

        return (
          <td key={column}>
            {column === "Proposal title"
              ? `Nb of props: ${filteredData.length}`
              : column === "Includes Nouns"
              ? `Nouns: ${sumArraySizesInId(filteredData)}`
              : column === "Tx"
              ? `${sumArraySizesInTx(filteredData)}`
              : ["ETH", "USDC", "Total value", "True cost"].includes(column)
              ? (column === "ETH"
                  ? "Ξ"
                  : column === "True cost" || column === "USDC" || "Total value"
                  ? "$"
                  : "") + calculateColumnSum(filteredData, column)
              : column === "Updates"
              ? `Props: ${countYesInPropdate(filteredData)}`
              : column === "Nb"
              ? `Updates: ${sumIntegersInColumn(filteredData, "Nb")}`
              : column === "Sponsor"
              ? `Sponsors: ${countUniqueValues(filteredData, "Sponsor") - 1}`
              : column === "Team"
              ? `Members: ${countUniqueStringsInArrayOfArrays(
                  filteredData,
                  "Team"
                )}`
              : column === "Stream"
              ? `Streams: ${countCheckmarksInStream(filteredData)}`
              : column === "Proposer"
              ? `Proposers: ${countUniqueValues(filteredData, "Proposer")}`
              : ""}
          </td>
        );
      })}
    </tr>
  );
};

export default SumRow;
