import React, { useEffect, useState } from "react";
import {
  changeElectionPhase,
  getElectionPhase,
  initializeContract,
} from "../../utils/interect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ElectionPhase = () => {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to trigger the effect only once

  const fetchData = async () => {
    try {
      const newPhase = await getElectionPhase();
      setCurrentPhase(newPhase || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhaseChange = async (phase) => {
    try {
      const votingContract = await initializeContract();
      await changeElectionPhase(phase);
      votingContract.once("ElectionPhaseChanged", () => {
        toast.success("Election Phase Changed! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

      setCurrentPhase(phase);
    } catch (error) {
      toast.error("There is some problem!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };

  const getPhaseName = () => {
    switch (currentPhase) {
      case 0:
        return "Registration";
      case 1:
        return "Voting";
      case 2:
        return "Termination";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-100 rounded-md p-4">
      <h1 className="text-xl font-bold mb-4">Election Phase</h1>
      <div className="flex gap-4">
        <button
          className={`${
            currentPhase === 0
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handlePhaseChange(0)}
        >
          Registration
        </button>
        <button
          className={`${
            currentPhase === 1
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handlePhaseChange(1)}
        >
          Voting
        </button>
        <button
          className={`${
            currentPhase === 2
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-md`}
          onClick={() => handlePhaseChange(2)}
        >
          Termination
        </button>
      </div>
      <ToastContainer />

      <p className="mt-4">
        Current Phase: <strong>{getPhaseName()}</strong>
      </p>
    </div>
  );
};

export default ElectionPhase;
