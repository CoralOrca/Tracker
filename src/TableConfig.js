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
  "Nb",
  "Nouns Turnout",
  "Updates",
  "Transactions Notes",
  "Price of ETH",
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
  "Former candidate",
  "Nouns Turnout",
  "Wallets Turnout",
  "Price of ETH",
  "Total value",

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
  "Status",
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
  "Tx",
  "Nouns vote",
  "Wallets vote",
  "True cost",
];

export const backgroundHeader2 = [
  "ETH",
  "USDC",
  "Total value",
  "Includes Nouns",
  "Nouns ID",
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

export const costsColumns = [
  "ETH",
  "USDC",
  "Total value",
  "Includes Nouns",
  "Nouns ID",
];

export const colorsForFirstChart = [
  "rgb(0,0,0)", //ongoing
  "rgb(241,46,92)", //defeated
  "rgb(7, 186, 116)", //succeeded
  "rgb(130, 137, 134)", //canceled
  "rgb(53, 54, 53)", //vetoed
  "rgb(130, 137, 134)", //expired
];

export const colorsForSecondChart = [
  "rgb(43,220, 151)", //
  "rgb(7, 186, 116)", //success
  "rgb(130, 137, 134)", //cancelled
  "rgb(53, 54, 53)", //uncertain
  "rgb(255, 180, 61)", //behind
  "rgb(53, 54, 53)", //abandonned
];

export const colorsForThirdChart = [
  "rgb(56, 120, 229)", //operations
  "rgb(59, 148, 227)", //commu
  "rgb(54, 90, 231)", //Operations
  "rgb(76, 48, 218)", // sport
  "rgb(61, 176, 225)", //Charity
  "rgb(24, 30, 192)", //content
  "rgb(105, 47, 238)", //physical
  "rgb(75,50,236)", // art
  "rgb(208, 74, 246)", //events
  "rgb(105, 47, 238)", // goods
  "rgb(162, 28, 137)", // gaming
  "rgb(136, 45, 240)", //other
  "rgb(169, 43, 243)", //staking
  "rgb(52, 58, 234)", //Marketing
  "rgb(204, 41, 245)", //droposal
  "rgb(240, 38, 247)", //invest
];
