const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("Election contract", function () {
      let election;
      let owner;
      let addr1;

      beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();
        election = await ethers.getContract("Election", owner);
      });

      describe("voting", function () {
        it("casts a vote", async function () {
          const cnic = 1044559;
          const name = "usman khan";
          await election.registerVoter(cnic, owner.address);
          await election.authenticateVoter(cnic);
          await election.registerCandidate(name);
          const candidateId = 2;
          await election.castVote(candidateId);
          const candidate = await election.candidates(candidateId);
          console.log(candidate.voteCount)
          expect(candidate.voteCount).to.equal(1);
          const voter = await election.voters(cnic);
          expect(voter.voted).to.equal(true);
        });
      });
    });
