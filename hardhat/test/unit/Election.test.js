const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

describe("VotingSystem", function () {
  let votingSystem;
  let owner;
  let voter1;
  let voter2;

  beforeEach(async () => {
    await deployments.fixture(["VotingSystem"]);
    [owner, voter1, voter2] = await ethers.getSigners();
    votingSystem = await ethers.getContract("VotingSystem", owner);
  });

  describe("Registration Phase", function () {
    it("should allow voters to register", async function () {
      const cnic1 = 12345;
      await votingSystem.registerVoter(cnic1);
      const voter1Data = await votingSystem.voters(cnic1);
      expect(voter1Data.isRegistered).to.be.true;
      expect(voter1Data.hasVoted).to.be.false;
    });

    it("should prevent duplicate voter registration", async function () {
      const cnic1 = 12345;
      await votingSystem.registerVoter(cnic1);
      await expect(votingSystem.registerVoter(cnic1)).to.be.revertedWith(
        "You are already registered as a voter."
      );
    });
  });

  describe("Voting Phase", function () {
    beforeEach(async () => {
      await votingSystem.addCandidate("imran", 42, "pti", "bat");
    });

    it("should allow registered voters to cast votes", async function () {
      const cnic1 = 12345;
      await votingSystem.registerVoter(cnic1);
      const candidateId = 0;
      await votingSystem.changeElectionPhase(1);
      await votingSystem.castVote(cnic1, candidateId);
      const candidate = await votingSystem.candidates(candidateId);
      expect(candidate.voteCount).to.equal(1);
      const voter = await votingSystem.voters(cnic1);
      expect(voter.hasVoted).to.be.true;
    });

    it("should prevent duplicate votes from the same voter", async function () {
      const cnic1 = 12345;
      await votingSystem.registerVoter(cnic1);
      const candidateId = 0;
      await votingSystem.changeElectionPhase(1);
      await votingSystem.castVote(cnic1, candidateId);
      await expect(
        votingSystem.castVote(cnic1, candidateId)
      ).to.be.revertedWith("You have already casted your vote.");
    });

    it("should prevent voting with an invalid candidate index", async function () {
      const cnic1 = 12345;
      await votingSystem.registerVoter(cnic1);
      const invalidCandidateId = 999;
      await votingSystem.changeElectionPhase(1);
      await expect(
        votingSystem.castVote(cnic1, invalidCandidateId)
      ).to.be.revertedWith("Invalid candidate index.");
    });
  });
});
