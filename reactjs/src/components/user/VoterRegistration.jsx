import React, { useState } from "react";
import axios from "axios"; // add this line
import { connectWallet, initializeContract, registerUser } from "../../utils/interect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VoterRegistration = () => {
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [voterData, setVoterData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cnic.length !== 13) {
      setError("Please enter a correct CNIC number.");
      return;
    }
    const votingContract = await initializeContract();
    try {
      const response = await axios.get(
        `http://localhost:5000/voterData/${cnic}`
      );
      // console.log(response.data);
      // const wallet = await connectWallet();
      await registerUser(cnic);
      // Fire the event manually
      votingContract.once("VoterRegistered", () => {
        toast.success("VoterRegistered Successfully! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setVoterData(response.data);
        setAddress("");
        setCnic("");
        setError("");
      });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setVoterData(null);
    }
  };

  return (
    <div className="mt-20 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto  rounded-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2 text-center">
            Voter Registration
          </h2>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label
                className="block font-medium text-gray-700 mb-2"
                htmlFor="cnic"
              >
                CNIC Number
              </label>
              <input
                className="block bg-gray-100 w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="cnic"
                id="cnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                type="tel"
                maxLength={15}
                required
                placeholder="XXXXX-XXXXXXX-X"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </div>

            <div className="mb-6">
              <label
                className="block font-medium text-gray-700 mb-2"
                htmlFor="address"
              >
                Account Address
              </label>
              <input
                className="block bg-gray-100 w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <ToastContainer/>
            <div className="flex items-center justify-center">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoterRegistration;
