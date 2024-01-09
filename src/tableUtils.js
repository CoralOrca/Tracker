// tableUtils.js
import React from "react";
import NTChart from "./NTChart";
import NTChart2 from "./NTChartNoQuorum";

// Utility function for calculating column sum
export const calculateColumnSum = (data, columnName) => {
  // Calculate the sum of the specified column for the data
  const sum = data.reduce(
    (acc, row) => acc + parseFloat(row[columnName] || 0),
    0
  );
  // Round the sum and format it with commas for display
  const roundedSum = Math.round(sum);
  return roundedSum.toLocaleString();
};

// Utility function to render the title with a TLDR popup
export const renderTitle = (row) => (
  <div className="title-container">
    <span className="Proposal title">{row["Proposal title"]}</span>
    <div className="tldr-popup">
      {row["TLDR"]}
      <a
        href={`https://www.nouns.camp/proposals/${row["#"]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="read-more-link"
      >
        --> Read more
      </a>
    </div>
  </div>
);

export const sumIntegersInColumn = (data, columnName) => {
  return data.reduce((sum, row) => {
    const value = parseInt(row[columnName], 10);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
};

export const renderLink = (url, className, content) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
};

export const renderList = (items, className) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// Utility function to format a number with commas for display
export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const renderNumericValue = (value) => {
  return formatNumberWithCommas(value);
};

// Utility function to render a Propdate with a link
export const renderPropdate = (row) => (
  <a
    href={`https://www.updates.wtf/prop/${row["#"]}`}
    target="_blank"
    rel="noopener noreferrer"
    className="column-links"
  >
    {row["Updates"]}
  </a>
);

// Utility function to render an NTChart component
export const renderNTChart = (
  forValue,
  againstValue,
  abstainValue,
  quorumValue,
  totalValue
) => (
  <NTChart
    forValue={parseFloat(forValue || 0)}
    againstValue={parseFloat(againstValue || 0)}
    abstainValue={parseFloat(abstainValue || 0)}
    quorumValue={parseFloat(quorumValue || 0)}
    totalValue={parseFloat(totalValue || 0)}
  />
);

// Utility function to render an NTChart component
export const renderNTChart2 = (forValue, againstValue, abstainValue) => (
  <NTChart2
    forValue={parseFloat(forValue || 0)}
    againstValue={parseFloat(againstValue || 0)}
    abstainValue={parseFloat(abstainValue || 0)}
  />
);

// Utility function to render the transaction number
export const renderTxNb = (transactionSize) => (
  <div>
    <a className="row-style">{transactionSize}</a>
  </div>
);

// Function to filter data based on selected filters
export const filterData = (jsonData, filterColumn, selectedFilters) => {
  return jsonData.filter((row) => {
    return (
      selectedFilters.length === 0 ||
      selectedFilters.includes(row[filterColumn])
    );
  });
};

// Function to sort data based on a column and order
export const sortData = (data, columnName, sortOrder) => {
  const isStringColumn = typeof data[0][columnName] === "string";

  return data.slice().sort((a, b) => {
    if (isStringColumn) {
      return sortOrder === "asc"
        ? a[columnName].localeCompare(b[columnName])
        : b[columnName].localeCompare(a[columnName]);
    } else {
      return sortOrder === "asc"
        ? a[columnName] - b[columnName]
        : b[columnName] - a[columnName];
    }
  });
};

// Function to get the CSS class name based on the outcome
export const getOutcomeClassName = (outcome) => {
  switch (outcome) {
    case "Defeated":
      return "defeated";
    case "Canceled":
    case "Vetoed":
      return "canceled";
    case "Succeeded":
      return "succeeded";
    case "<Quorum":
      return "noQuorum";
    default:
      return "";
  }
};

// Function to get the CSS class name based on the outcome
export const getIndexClassName = (outcome) => {
  switch (outcome) {
    case "Defeated":
      return "index-defeated";
    case "Canceled":
    case "Vetoed":
      return "index-canceled";
    case "Succeeded":
      return "index-succeeded";
    case "<Quorum":
      return "index-noQuorum";
    default:
      return "";
  }
};

// Function to count unique values in a column
export const countUniqueValues = (data, columnName) => {
  const uniqueValues = new Set(data.map((row) => row[columnName]));
  return uniqueValues.size;
};

export const countUniqueStringsInArrayOfArrays = (data, columnName) => {
  // Flatten the array of string arrays into a single array and trim whitespace
  const flattenedArray = data.reduce((acc, row) => {
    const arrayValues = row[columnName];
    if (Array.isArray(arrayValues)) {
      // Trim each string and add it to the accumulator
      arrayValues.forEach((value) => {
        if (typeof value === "string") {
          acc.push(value.trim());
        }
      });
    }
    return acc;
  }, []);

  // Use a Set to find unique values
  const uniqueValues = new Set(flattenedArray);
  return uniqueValues.size;
};

// Function to get the CSS class name based on the ostatus
export const getStatusClassName = (status) => {
  switch (status) {
    case "On-schedule":
      return "status-onSchedule";
    case "Completed":
      return "status-completed";
    case "Canceled":
      return "status-canceled";
    case "Behind schedule":
      return "status-behind";
    case "Abandoned":
      return "status-abandoned";
    case "Uncertain":
      return "status-uncertain";
    case "canceled":
      return "status-canceled";
    default:
      return "";
  }
};

// Function to format the voting end date and time
export const formatVotingEnd = (row) => {
  const votingEndDay = row["Voting end day"];
  const votingEndTime = row["Voting end time (GMT+9)"];

  if (votingEndDay && votingEndTime) {
    // Format the time and combine it with the day
    const formattedTime = votingEndTime.replace(/\s+/g, "");
    return `${votingEndDay} ${formattedTime}`;
  }

  return "";
};

// Function to count checkmarks in the "Stream" column
export const countCheckmarksInStream = (data) => {
  return data.reduce((count, row) => {
    const transactions = row["Transactions details"] || [];
    const hasCreateStream = transactions.includes("createStream");
    return hasCreateStream ? count + 1 : count;
  }, 0);
};
