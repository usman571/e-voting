import React, { useState } from "react";
import { addCandidate, initializeContract } from "../../utils/interect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCandidate = () => {
  const [isCandidateAdded, setIsCandidateAdded] = useState(false);
  const [candidate, setCandidate] = useState({
    name: "",
    age: "",
    party: "",
    partySymbol: "",
  });

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const votingContract = await initializeContract();
    try {
      await addCandidate(
        candidate.name,
        candidate.age,
        candidate.party,
        candidate.partySymbol
      );

      // Fire the event manually
      votingContract.once("CandidateAdded", () => {
        toast.success("CandidateAdded Successfully! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCandidate({
          name: "",
          age: "",
          party: "",
          partySymbol: "",
        });
        setIsCandidateAdded(true);
      });
    } catch (error) {
      toast.success("there is some problem ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-lg sm:w-3/4">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          Add Candidate
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-bold text-gray-800">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={candidate.name}
              onChange={handleChange}
              placeholder="Enter candidate name"
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-lg font-bold text-gray-800">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={candidate.age}
              onChange={handleChange}
              placeholder="Enter candidate age"
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="party" className="text-lg font-bold text-gray-800">
              Party
            </label>
            <input
              type="text"
              name="party"
              id="party"
              value={candidate.party}
              onChange={handleChange}
              placeholder="Enter candidate party"
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="partySymbol"
              className="text-lg font-bold text-gray-800"
            >
              Party Symbol
            </label>
            <input
              type="text"
              name="partySymbol"
              id="partySymbol"
              value={candidate.partySymbol}
              onChange={handleChange}
              placeholder="Enter candidate party symbol"
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 mr-auto"
          >
            Add Candidate
          </button>
          <ToastContainer />

          {isCandidateAdded && (
            <p className="text-green-500 mt-2">
              Candidate has been successfully added!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
