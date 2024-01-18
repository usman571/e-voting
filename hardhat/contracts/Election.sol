// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint256 id;
        string name;
        uint256 age;
        string party;
        string partySymbol;
        uint256 voteCount;
    }
    struct Voter {
        uint256 cnic;
        bool isRegistered;
        bool hasVoted;
        address ethAddress; // Added field to store the Ethereum address
    }
    enum ElectionPhase {
        Registration,
        Voting,
        Termination
    }
    address public admin;
    mapping(string => bool) private existingNames;
    mapping(string => bool) private existingSymbols;
    mapping(uint256 => Voter) public voters; // Use CNIC number as the key
    mapping(address => uint256) public cnicByAddress; // Map Ethereum address to CNIC
    Candidate[] public candidates;
    ElectionPhase public currentPhase;
    uint256 public nextCandidateId;

    event CandidateAdded(
        string name,
        uint256 age,
        string party,
        string partySymbol
    );
    event VoterRegistered();
    event VoteCasted(uint256 cnic);
    event ElectionPhaseChanged(ElectionPhase newPhase);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    modifier onlyRegisteredVoter(uint256 _cnic) {
        require(
            voters[_cnic].isRegistered,
            "Only registered voters can perform this action."
        );
        _;
    }

    modifier onlyDuringVotingPhase() {
        require(
            currentPhase == ElectionPhase.Voting,
            "This action can only be performed during the voting phase."
        );
        _;
    }

    constructor() {
        admin = msg.sender;
        currentPhase = ElectionPhase.Registration;
    }

    function addCandidate(
        string memory _name,
        uint256 _age,
        string memory _party,
        string memory _partySymbol
    ) public onlyAdmin {
        require(
            !isCandidateExists(_name, _partySymbol),
            "Candidate with the same name or symbol already exists."
        );
        Candidate memory newCandidate = Candidate(
            nextCandidateId,
            _name,
            _age,
            _party,
            _partySymbol,
            0
        );
        candidates.push(newCandidate);
        nextCandidateId++;
        existingNames[_name] = true; // Mark the name as existing
        existingSymbols[_partySymbol] = true; // Mark the symbol as existing
        emit CandidateAdded(_name, _age, _party, _partySymbol);
    }

    // Function to check if a candidate with the same name or symbol already exists
    function isCandidateExists(
        string memory _name,
        string memory _partySymbol
    ) internal view returns (bool) {
        return existingNames[_name] || existingSymbols[_partySymbol];
    }

    function registerVoter(uint256 _cnic) public {
        require(
            !voters[_cnic].isRegistered,
            "You are already registered as a voter."
        );
        require(
            currentPhase == ElectionPhase.Registration,
            "Voter registration is currently closed."
        );

        address ethAddress = msg.sender;
        voters[_cnic] = Voter(_cnic, true, false, ethAddress);
        cnicByAddress[ethAddress] = _cnic; // Map the Ethereum address to CNIC
        emit VoterRegistered();
    }

    function changeElectionPhase(ElectionPhase _newPhase) public onlyAdmin {
        currentPhase = _newPhase;
        emit ElectionPhaseChanged(_newPhase);
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function getCandidate(
        uint256 _candidateIndex
    )
        public
        view
        returns (
            uint256 id,
            string memory name,
            uint256 age,
            string memory party,
            string memory partySymbol,
            uint256 voteCount
        )
    {
        require(
            _candidateIndex < candidates.length,
            "Invalid candidate index."
        );

        Candidate memory candidate = candidates[_candidateIndex];
        return (
            candidate.id,
            candidate.name,
            candidate.age,
            candidate.party,
            candidate.partySymbol,
            candidate.voteCount
        );
    }

    function castVote(
        uint256 _cnic,
        uint256 _candidateIndex
    ) public onlyRegisteredVoter(_cnic) onlyDuringVotingPhase {
        require(!voters[_cnic].hasVoted, "You have already casted your vote.");
        require(
            _candidateIndex < candidates.length,
            "Invalid candidate index."
        );

        voters[_cnic].hasVoted = true;
        candidates[_candidateIndex].voteCount++;
        emit VoteCasted(_cnic);
    }

    function getCNICByAddress(
        address _ethAddress
    ) public view returns (uint256) {
        uint256 cnic = cnicByAddress[_ethAddress];
        require(cnic != 0, "No CNIC found for the given address.");
        return cnic;
    }
}
