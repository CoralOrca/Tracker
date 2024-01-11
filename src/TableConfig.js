// tableConfig.js

export const excludeFilterForColumns = [
  "#",
  "Proposal title",
  "ETH",
  "USDC",
  "Total value",
  "True cost",
  "Nouns vote",
  "Wallets vote",
  "Block",
  "Tx",
  "Twitter links",
  "Notes",
  "Inflow Gen",
  "Prop Submission Date",
  "Voting end",
  "Nouns @ Block",
  "Nouns Voting",
  "Nouns For",
  "Nouns Against",
  "Nouns Abstain",
  "Quorum",
  "Wallets Turnout",
  "Wallets Voting",
  "Wallets For",
  "Wallets Against",
  "Wallets Abstain",
  "Wallets Turnout",
  "Updates Nb",
  "Nouns Turnout",
  "Updates",
];

export const invisibleColumns = [
  "Has extra funds",
  "TLDR",
  "Proposer Link",
  "Sponsor Link",
  "Twitter links",
  "Voting end day",
  "Prop Submission Date",
  "Inflow Gen",
  "Nb Nouns at Block",
  "Voting end time (GMT+9)",
  "Voting end",
  "Former candidate",
  "Nouns Turnout",
  "Wallets Turnout",

  // ... any other columns that should be invisible
];

export const noSortingColumns = [
  "Nouns vote",
  "Wallets vote",
  "Team",
  "Category",
  "Transactions details",
  "Transactions Notes",
  "Twitter links",
  "Voting end day",
  "Voting end",
  "Nouns ID",
  "Outcome",
  "Proposal status",
  "Former candidate",
  "Sponsor",
  "Proposer",
  "Stream",
  "Notes",
  "Includes Nouns",
  "Tx",
  // ... any other columns where sorting should not be applied
];

/*Background cells*/

export const backgroundHeader1 = [
  "Nouns Voting",
  "Nouns For",
  "Nouns Against",
  "Nouns Abstain",
  "Nouns Turnout",
  "Quorum",
  "Wallets Voting",
  "Wallets For",
  "Wallets Against",
  "Wallets Abstain",
  "Wallets Turnout",
  "Transactions details",
  "Transactions Notes",
  "Block",
];

export const backgroundHeader2 = [
  "ETH",
  "USDC",
  "Total value",
  "True cost",
  "Includes Nouns",
  "Nouns ID",
];

export const nounsTokenColumns = [
  "Nouns Voting",
  "Nouns For",
  "Nouns Against",
  "Nouns Abstain",
  "Nouns Turnout",
  "Quorum",
];

export const walletsColumns = [
  "Wallets Voting",
  "Wallets For",
  "Wallets Against",
  "Wallets Abstain",
  "Wallets Turnout",
];

export const txColumns = [
  "Transactions details",
  "Transactions Notes",
  "Block",
];
