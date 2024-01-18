const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const Election = await ethers.getContractFactory("VotingSystem");
  const election = await Election.deploy();

  await election.deployed();

  console.log("Election contract deployed to:", election.address);

  // Register a candidate
  await election.addCandidate("Imran khan", 50, "pti", "bat");

  // Register a voter
  await election.registerVoter(12345);

  // Change Election Phase
  await election.changeElectionPhase(1);

  // Cast a vote
  await election.castVote(12345, 0);
  console.log(`vote has been successfully casted`);

  // Output the contract ABI and address to a JSON file
  // const contractData = {
  //   abi: election.interface.format("json"),
  //   address: election.address,
  // };
  // fs.writeFileSync("contractData.json", JSON.stringify(contractData));
  // console.log("Contract data saved to contractData.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
