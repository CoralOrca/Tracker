import React from "react";
import {
  RiCheckFill,
  RiTwitterXFill,
  RiTaskLine,
  RiSearchLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { FaArchway } from "react-icons/fa";
import {
  renderTLDR,
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
  costsColumns,
} from "./TableConfig";

import getColumnClassUtils from "./GetColumnClassUtils";

const JsonTableRow = ({
  row,
  columns,
  showNounsTokensGroup,
  showWalletsGroup,
  showTxGroup,
  showCostsGroup,
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
        return <td key={column}>{renderTLDR(row)}</td>;
      //--------------------------------------------------------------------------------------------------
      case "Category":
        return (
          <div>
            {Array.isArray(row[column]) ? (
              <ul className="category-list">
                {row[column].map((item, index) => (
                  <li
                    key={index}
                    className={`category-pill category-${item.toLowerCase()}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`category-pill category-${row[
                  column
                ].toLowerCase()}`}
              >
                {row[column]}
              </div>
            )}
          </div>
        );
      //--------------------------------------------------------------------------------------------------
      case "ETH":
      case "USDC":
      case "Total value":
      case "True cost":
        return (
          <span className=" row-style">
            <td>{renderNumericValue(row[column])}</td>
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
              <div>
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
        // Check if the Outcome is "Ongoing" and return an empty cell if it is
        if (row["Outcome"] === "Ongoing") {
          return (
            <td key={column}>
              <div>
                <a
                  href={`https://www.nouns.camp/proposals/${row["#"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ...
                </a>
              </div>
            </td>
          ); // Renders an empty cell
        }

        // If the Outcome is not "Ongoing", render the cell content as usual
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
        // Check if the Outcome is "Ongoing" and return an empty cell if it is
        if (row["Outcome"] === "Ongoing") {
          return <td key={column}>&nbsp;</td>; // Renders an empty cell
        }

        // If the Outcome is not "Ongoing", render the cell content as usual
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
        // Check if the Status is "Ongoing" before rendering anything for Outcome
        if (row["Status"] === "Ongoing") {
          return <td key={column}>&nbsp;</td>; // Renders an empty cell if Status is Ongoing
        } else {
          // Proceed with the original logic if Status is not Ongoing
          const className = getOutcomeClassName(row["Outcome"]);
          // This condition seems redundant given the action is the same regardless of the outcome
          // But if you plan to extend different behaviors for different outcomes, it's okay to keep it
          if (row["Outcome"] === "Canceled") {
            return <span className={className}>{row["Outcome"]}</span>;
          }
          return <span className={className}>{row["Outcome"]}</span>;
        }

      //--------------------------------------------------------------------------------------------------
      case "Status":
        const statusOutcome = row["Outcome"];
        if (
          ["Canceled", "Expired", "Defeated", "Vetoed"].includes(statusOutcome)
        ) {
          // Return an empty cell if the Outcome is one of the specified values
          return <td key={column}>&nbsp;</td>;
        } else {
          // If Outcome is not one of the specified values, render the Status as usual
          const StatusclassName = getStatusClassName(row["Status"]);
          return <span className={StatusclassName}>{row["Status"]}</span>;
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
              <div>{row[column]}</div>
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
                {/*<RiCheckFill style={{ fontSize: "large" }} />*/}
                <RiSearchLine />
                <RiArrowRightLine />
              </a>
            ) : (
              <></> // Render an empty cell for non-"Yes" values
            )}
          </td>
        );

      case "Nb":
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
          <td key={column} className="row-style">
            {Array.isArray(row[column]) && Array.isArray(row["Twitter links"])
              ? row[column].map((name, index) => (
                  <React.Fragment key={index}>
                    {row["Twitter links"][index] &&
                    row["Twitter links"][index].includes(
                      "https://twitter.com/"
                    ) ? (
                      <a
                        href={row["Twitter links"][index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-link"
                      >
                        {name.trim()} <RiTwitterXFill />
                      </a>
                    ) : row["Twitter links"][index] &&
                      row["Twitter links"][index].includes(
                        "https://warpcast.com/"
                      ) ? (
                      <a
                        href={row["Twitter links"][index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-link"
                      >
                        {name.trim()} <FaArchway />
                      </a>
                    ) : (
                      <span>{name.trim()}</span>
                    )}
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
          ["ETH", "USDC"].includes(column) &&
          showCostsGroup
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
          (costsColumns.includes(column) && !showCostsGroup) ||
          invisibleColumns.includes(column)
        ) {
          return null;
        }

        let columnClass = getColumnClassUtils(column); // Use the utility function

        return (
          <td className={columnClass} key={column}>
            {renderCellContent(column, row)}{" "}
          </td>
        );
      })}
    </tr>
  );
};

export default JsonTableRow;
