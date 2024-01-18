import React, { useState } from "react";
import Modal from "react-modal";

const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col items-center right-[30%] top-[30%] absolute z-10">
      <p className="mb-4">{message}</p>
      <div className="flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 text-sm"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
};

const CandidateCard = ({ candidate, onVote }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 50, right: 50 });

  const handleVote = (confirmed) => {
    if (confirmed) {
      onVote(selectedCandidate);
    }
    setShowConfirmation(false);
  };

  const handleVoteButtonClick = (candidate, e) => {
    setSelectedCandidate(candidate);
    setButtonPosition({ top: e.pageY, right: window.innerWidth - e.pageX });
    setShowConfirmation(true);
  };

  return (
    <div className="mt-8 p-4 rounded-lg shadow-lg border border-gray-300 relative">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt={candidate.party}
          className="w-16 h-16 mr-4 rounded-full"
        />
        <div>
          <div className="text-lg font-semibold">{candidate.name}</div>
          <div className="text-gray-600 text-sm">{candidate.party}</div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm ml-auto"
          onClick={(e) => handleVoteButtonClick(candidate, e)}
        >
          Vote
        </button>
      </div>

      {showConfirmation && (
        <Modal
          isOpen={showConfirmation}
          onRequestClose={() => setShowConfirmation(false)}
          className="modal"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          <ConfirmationBox
            message={`Are you sure you want to vote for ${selectedCandidate.name} (${selectedCandidate.party})?`}
            onConfirm={() => handleVote(true)}
            onCancel={() => handleVote(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CandidateCard;
