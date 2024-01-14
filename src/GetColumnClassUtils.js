// getColumnClassUtils.js

const getColumnClassUtils = (column) => {
  if (["#", "Tx"].includes(column)) {
    return "col-xs";
  }
  /*-------------------------------------------*/
  if (
    ["Proposal title", "Transactions details", "Team", "Voting end"].includes(
      column
    )
  ) {
    return "col-title";
  }
  /*-------------------------------------------*/
  if (
    [
      "Stream",
      "Updates",
      "Nouns Voting",
      "Nouns For",
      "Nouns Against",
      "Nouns Abstain",
      "Quorum",
      "Nouns Turnout",
      "Wallets Voting",
      "Wallets For",
      "Wallets Against",
      "Wallets Abstain",
      "Wallets Turnout",
      "Block",
      "Nb",
      "True cost",
    ].includes(column)
  ) {
    return "col-small";
  }
  /*-------------------------------------------*/
  if (["Former candidate"].includes(column)) {
    return "col-medium";
  }
  /*-------------------------------------------*/
  if (["Status", "Outcome", "Transactions Notes"].includes(column)) {
    return "col-Xmedium";
  }
  /*-------------------------------------------*/
  if (
    ["Nouns vote", "Wallets vote", "Category", "Price of ETH"].includes(column)
  ) {
    return "col-large";
  }
  /*-------------------------------------------*/
  if (
    ["ETH", "USDC", "Total value", "Nouns ID", "Includes Nouns"].includes(
      column
    )
  ) {
    return "col-financial";
  }
  /*-------------------------------------------*/
  if (["Proposer", "Sponsor"].includes(column)) {
    return "col-people";
  }

  return ""; // default class if none of the conditions are met
};

export default getColumnClassUtils;
