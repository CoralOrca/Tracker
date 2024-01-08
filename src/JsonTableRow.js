import React from "react";
import { RiCheckFill } from "react-icons/ri";
import {
  renderTitle,
  renderPropdate,
  renderNTChart,
  renderNTChart2,
  renderTxNb,
  getOutcomeClassName,
  getIndexClassName,
  getStatusClassName,
  formatVotingEnd,
  renderNumericValue,
} from "./tableUtils";

import {
  invisibleColumns,
  nounsTokenColumns,
  walletsColumns,
  txColumns,
} from "./TableConfig";

const JsonTableRow = ({
  row,
  columns,
  showNounsTokensGroup,
  showWalletsGroup,
  showTxGroup,
}) => {
  const renderCellContent = (column, row) => {
    switch (column) {
      //--------------------------------------------------------------------------------------------------
      case "#":
        const indexClassName = getIndexClassName(row["Outcome"]);
        return (
          <a
            className={`index ${indexClassName}`}
            href={`https://www.nouns.camp/proposals/${row["#"]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row["#"]}
          </a>
        );
      //--------------------------------------------------------------------------------------------------
      case "Proposal title":
        return <td key={column}>{renderTitle(row)}</td>;
      //--------------------------------------------------------------------------------------------------

      case "Category":
        return (
          <div>
            {Array.isArray(row[column]) ? (
              <ul className="category-list">
                {row[column].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="category-item">{row[column]}</div>
            )}
          </div>
        );

      case "ETH":
      case "USDC":
      case "Total value":
      case "True cost":
        return (
          <span className="financials row-style">
            <td className="col-financial">{renderNumericValue(row[column])}</td>
          </span>
        );
      //--------------------------------------------------------------------------------------------------
      case "Includes Nouns":
        if (row["Includes Nouns"] === "No") {
          // Return an empty cell or a placeholder
          return <td key={column}>&nbsp;</td>;
        } else {
          // Render the cell content as usual if the value is not "No"
          return (
            <td
              key={column}
              className="row-style checkmark-style centered-icon"
            >
              <RiCheckFill
                style={{
                  color: "rgb(13, 146, 77, 1",
                  fontSize: "large",
                }}
              />
            </td>
          );
        }

      case "Nouns ID":
        const moreThanTwo =
          row[column] && Array.isArray(row[column]) && row[column].length > 3;
        const remainingItems = moreThanTwo ? row[column].slice(3) : [];

        return (
          <div>
            {Array.isArray(row[column]) ? (
              <ul className="category-list">
                {row[column].slice(0, 3).map((item, index) => (
                  <li className="code-style" key={index}>
                    <a
                      style={{ color: "black" }}
                      href={`https://nouns.wtf/noun/${item}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                {moreThanTwo && (
                  <li className="code-style more-items-popover">
                    ...
                    <span className="popover-content">
                      {remainingItems.join(", ")}
                    </span>
                  </li>
                )}
              </ul>
            ) : (
              <div className="category-item">
                <a
                  href={`https://nouns.wtf/noun/${row[column]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row[column]}
                </a>
              </div>
            )}
          </div>
        );
      //--------------------------------------------------------------------------------------------------
      case "Nouns vote":
        return (
          <td key={column}>
            {renderNTChart(
              row["Nouns For"],
              row["Nouns Against"],
              row["Nouns Abstain"],
              row["Quorum"],
              row["Nouns Voting"]
            )}
          </td>
        );
      //--------------------------------------------------------------------------------------------------
      case "Wallets vote":
        return (
          <td key={column}>
            {renderNTChart2(
              row["Wallets For"],
              row["Wallets Against"],
              row["Wallets Abstain"],
              row["Wallets Voting"]
            )}
          </td>
        );
      //--------------------------------------------------------------------------------------------------
      case "Outcome":
        const className = getOutcomeClassName(row["Outcome"]);

        // Check if the Outcome is "Canceled"
        if (row["Outcome"] === "Canceled") {
          return <span className={className}>{row["Outcome"]}</span>;
        }

        return <span className={className}>{row["Outcome"]}</span>;
      //--------------------------------------------------------------------------------------------------
      case "Proposal status":
        const statusOutcome = row["Outcome"];
        if (
          ["Canceled", "Expired", "Defeated", "Vetoed"].includes(statusOutcome)
        ) {
          // Return an empty cell if the Outcome is one of the specified values
          return <td key={column}>&nbsp;</td>;
        } else {
          // If Outcome is not one of the specified values, render the Status as usual
          const StatusclassName = getStatusClassName(row["Proposal status"]);
          return (
            <span className={StatusclassName}>{row["Proposal status"]}</span>
          );
        }
      //--------------------------------------------------------------------------------------------------
      case "Voting end":
        const votingEnd = formatVotingEnd(row);
        return (
          <span className="row-style">
            <p className="code-style">{votingEnd}</p>
          </span>
        );
      //--------------------------------------------------------------------------------------------------
      case "Tx":
        const transactionSize = Array.isArray(row["Transactions details"])
          ? row["Transactions details"].length
          : 0;
        return <td key={column}>{renderTxNb(transactionSize)}</td>;

      case "Transactions details":
        if (!showTxGroup) return null; // Hide the column if showTxGroup is false

        return (
          <div>
            {Array.isArray(row[column]) ? (
              <ul className="code-style">
                {row[column].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="category-item">{row[column]}</div>
            )}
          </div>
        );

      case "Transactions Notes":
        if (!showTxGroup) return null; // Hide the column if showTxGroup is false

        return <a></a>;
      //--------------------------------------------------------------------------------------------------
      case "Sponsor":
      case "Proposer":
        const linkColumn =
          column === "Sponsor" ? "Sponsor Link" : "Proposer Link";
        return (
          <a
            href={row[linkColumn]}
            target="_blank"
            rel="noopener noreferrer"
            className="column-links"
          >
            {row[column]}
          </a>
        );

      case "Block":
        return <span className="code-style">{row["Block"]}</span>;
      //--------------------------------------------------------------------------------------------------

      case "Updates":
        return (
          <td key={column} className="centered-icon">
            {row[column] === "Yes" ? (
              <a
                href={`https://www.updates.wtf/prop/${row["#"]}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgb(13, 146, 77, 1)" }}
              >
                <RiCheckFill style={{ fontSize: "large" }} />
              </a>
            ) : (
              <></> // Render an empty cell for non-"Yes" values
            )}
          </td>
        );

      case "Updates Nb":
        return (
          <td key={column} className="row-style">
            {row[column] === 0 ? (
              <></> // Render an empty cell for "0"
            ) : (
              row[column] // Render the cell content for non-zero values
            )}
          </td>
        );

      case "Former candidate":
        return (
          <td key={column} className="centered-icon">
            {row[column] === "Yes" ? (
              <RiCheckFill
                style={{
                  color: "rgb(13, 146, 77, 1)",
                  fontSize: "large",
                }}
              />
            ) : (
              <></> // Render an empty cell for "No"
            )}
          </td>
        );

      case "Team":
        return (
          <td key={column} className=" row-style">
            {Array.isArray(row[column]) && Array.isArray(row["Twitter links"])
              ? row[column].map((name, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={row["Twitter links"][index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-link"
                    >
                      {name.trim()}
                    </a>
                    {index < row[column].length - 1 && ", "}
                  </React.Fragment>
                ))
              : row[column]}
          </td>
        );

      //--------------------------------------------------------------------------------------------------
      default:
        return <span className="row-style">{row[column]}</span>;
    }
  };

  return (
    <tr>
      {columns.map((column) => {
        const cellValue = row[column];
        if (
          (cellValue === 0 || cellValue === "0") &&
          ["ETH", "USDC", "Total value", "True cost"].includes(column)
        ) {
          return (
            <td className="col-financial" key={column}>
              &nbsp;
            </td>
          );
        }

        if (column === "Stream") {
          const transactions = row["Transactions details"] || [];
          const hasCreateStream = transactions.includes("createStream");
          return (
            <td key={column} className="col-small checkmark-style">
              {hasCreateStream ? (
                <RiCheckFill
                  style={{
                    color: "rgb(13, 146, 77, 1",
                    fontSize: "large",
                  }}
                />
              ) : null}
            </td>
          );
        }

        if (
          (nounsTokenColumns.includes(column) && !showNounsTokensGroup) ||
          (walletsColumns.includes(column) && !showWalletsGroup) ||
          (txColumns.includes(column) && !showTxGroup) ||
          invisibleColumns.includes(column)
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
          column === "Outcome" || column === "Proposal status";

        const isLargeColumn =
          column === "Nouns vote" || column === "Wallets vote";

        // Determine the class based on the column
        let columnClass = "";

        if (isXSmallColumn) {
          columnClass = "col-xs";
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
        if (isTitleColumn) {
          columnClass = "col-title";
        }

        if (isFinancialColumn) {
          columnClass = "col-financial";
        }

        return (
          <td
            className={
              isXSmallColumn
                ? "col-xs"
                : isSmallColumn
                ? "col-small"
                : isTitleColumn
                ? "col-title"
                : isMediumColumn
                ? "col-medium"
                : isXMediumColumn
                ? "col-Xmedium"
                : isLargeColumn
                ? "col-large"
                : isFinancialColumn
                ? "col-financial"
                : ""
            }
            key={column}
          >
            {renderCellContent(column, row)}{" "}
          </td>
        );
      })}
    </tr>
  );
};

export default JsonTableRow;
