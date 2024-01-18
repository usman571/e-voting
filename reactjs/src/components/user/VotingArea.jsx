import { useState, useEffect } from "react";
import CandidateCard from "./CandidateCard";
import {
  getCandidates,
  castVote,
  getCNICByAddress,
  // getCurrentWalletConnected,
  useAccountChangeEffect,
  initializeContract,
} from "../../utils/interect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VotingArea = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const currentAccount = useAccountChangeEffect();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get candidates
        const fetchedCandidates = await getCandidates();
        setCandidates(fetchedCandidates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleVote = async (candidate) => {
    const votingContract = await initializeContract();

    try {
      // Get the CNIC associated with the current Ethereum address
      const cnic = await getCNICByAddress(currentAccount);
      await castVote(cnic, candidate.id.toString());
      votingContract.once("VoteCasted", () => {
        toast.success("VoteCasted Successfully! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setSelectedCandidate(candidate);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl max-h-screen overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="text-center font-semibold text-lg mb-4">
        List of Candidates
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {candidates?.map((candidate) => (
          <CandidateCard
            key={candidate.id.toString()}
            candidate={candidate}
            onVote={handleVote}
          />
        ))}
      </div>
      <ToastContainer />
      {selectedCandidate && (
        <div className="mt-8 text-center">
          You have voted for {selectedCandidate.name} ({selectedCandidate.party}
          )
        </div>
      )}
    </div>
  );
};

export default VotingArea;
