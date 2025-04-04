export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_productID", "type": "string" },
      { "internalType": "string", "name": "_brandName", "type": "string" },
      { "internalType": "string", "name": "_manufactureDate", "type": "string" },
      { "internalType": "string", "name": "_origin", "type": "string" }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "name": "products",
    "outputs": [
      { "internalType": "string", "name": "brandName", "type": "string" },
      { "internalType": "string", "name": "manufactureDate", "type": "string" },
      { "internalType": "string", "name": "origin", "type": "string" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_productID", "type": "string" }],
    "name": "verifyProduct",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];