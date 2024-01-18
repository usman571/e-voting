const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  const Election = await ethers.getContractFactory('Election');
  const election = await Election.deploy();

  await election.deployed();

  console.log('Election contract deployed to:', election.address);

  // Write the ABI and contract address to a file
  const artifacts = {
    abi: JSON.parse(election.interface.format('json')),
    address: election.address,
  };

  fs.writeFileSync('artifacts.json', JSON.stringify(artifacts));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
