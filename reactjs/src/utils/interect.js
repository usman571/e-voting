import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractData from "../contractData.json";

const abi = contractData.abi;
const address = contractData.address;

const initializeContract = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(address, abi, signer);
    return votingContract;
  }
  throw new Error(
    "No provider available. Please make sure you have MetaMask installed."
  );
};

const registerUser = async (cnic) => {
  try {
    const votingContract = await initializeContract();
    const registerUser = await votingContract.registerVoter(cnic);
    return registerUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register user.");
  }
};

const connectWallet = async () => {
  try {
    const votingContract = await initializeContract();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect wallet.");
  }
};

const getCurrentWalletConnected = async () => {
  try {
    const votingContract = await initializeContract();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    // Use the currently selected account as the connected account
    const currentAccount = provider.selectedAddress || accounts[0];
    return currentAccount;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get current connected wallet.");
  }
};

const addCandidate = async (name, age, party, symbol) => {
  try {
    const votingContract = await initializeContract();
    const transaction = await votingContract.addCandidate(
      name,
      age,
      party,
      symbol
    );
    return transaction.wait();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add candidate.");
  }
};

const getCNICByAddress = async (currentAddress) => {
  try {
    const votingContract = await initializeContract();
    const getCnicByAddress = await votingContract.getCNICByAddress(
      currentAddress
    );
    return getCnicByAddress;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get CNIC by address.");
  }
};

const getCandidates = async () => {
  try {
    const votingContract = await initializeContract();
    const candidatesCount = await votingContract.getCandidatesCount();
    const candidates = [];

    for (let i = 0; i < candidatesCount; i++) {
      const candidateData = await votingContract.getCandidate(i);
      const candidate = {
        id: candidateData.id,
        name: candidateData.name,
        age: candidateData.age,
        party: candidateData.party,
        partySymbol: candidateData.partySymbol,
        voteCount: candidateData.voteCount,
      };
      candidates.push(candidate);
    }

    return candidates;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get candidates.");
  }
};

const castVote = async (cnic, candidateIndex) => {
  try {
    const votingContract = await initializeContract();
    const tx = await votingContract.castVote(cnic, candidateIndex);
    return tx;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to cast vote.");
  }
};


const changeElectionPhase = async (newPhase) => {
  try {
    const votingContract = await initializeContract();
    const transaction = await votingContract.changeElectionPhase(newPhase);
    await votingContract.provider.waitForTransaction(transaction.hash);
    console.log('confirmed transaction')
    return transaction;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change election phase.");
  }
};

const getElectionPhase = async () => {
  try {
    const votingContract = await initializeContract();
    const currentPhase = await votingContract.currentPhase();
    return currentPhase;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get election phase.");
  }
};

const useAccountChangeEffect = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleAccountsChanged = (accounts) => {
    setCurrentAccount(accounts[0] || null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const account = await getCurrentWalletConnected();
        setCurrentAccount(account);
      } catch (error) {
        console.error(error);
      }
    };

    init();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return currentAccount;
};

export {
  initializeContract,
  getElectionPhase,
  changeElectionPhase,
  getCNICByAddress,
  connectWallet,
  getCandidates,
  registerUser,
  addCandidate,
  castVote,
  useAccountChangeEffect,
};
