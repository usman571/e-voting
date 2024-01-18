const fs = require("fs");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const contractName = "VotingSystem";
  const constructorArgs = [];

  const deployment = await deploy(contractName, {
    from: deployer,
    args: constructorArgs,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  // Write the ABI and contract address to a file
  const abi = JSON.stringify(deployment.abi);
  const address = deployment.address;

  const contractData = {
    abi,
    address,
  };
  fs.writeFileSync(
    "../reactjs/src/contractData.json",
    JSON.stringify(contractData)
  );

  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(deployment.address, constructorArgs);
  }

  log("----------------------------------------------------");
};

module.exports.tags = ["VotingSystem"];
