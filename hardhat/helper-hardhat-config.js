const networkConfig = {
  default: {
    name: "hardhat",
    keepersUpdateInterval: "30",
  },
  31337: {
    name: "localhost",
    callbackGasLimit: "500000", // 500,000 gas
  },
  1337: {
    name: "ganache",
  },
  11155111: {
    name: "sepolia",
    callbackGasLimit: "500000", // 500,000 gas
  },
  1: {
    name: "mainnet",
    keepersUpdateInterval: "30",
  },
};

const developmentChains = ["hardhat", "localhost",'ganache'];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
const frontEndContractsFile =
  "../reactjs/src/util/constants/contractAddresses.json";
const frontEndAbiFile = "../reactjs/src/util/constants/abi.json";

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiFile,
};
