import React from "react";

const VotingInformation = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">How to Vote</h2>
      <div className="flex flex-col space-y-4"></div>
      <div className="flex items-center space-x-4">
        <div className="bg-green-500 px-4 h-10 w-10 flex justify-center items-center rounded-full text-white font-bold">
          1
        </div>
        <div>
          <h3 className="text-xl font-bold">Register to Vote</h3>
          <p className="text-gray-700">
            Before you can vote, you must be registered as a voter. This can
            usually be done online, by mail, or in person. Check with your local
            election board to find out how to register to vote in your area.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-green-500 px-4  h-10 w-10 flex justify-center items-center rounded-full text-white font-bold">
          2
        </div>
        <div>
          <h3 className="text-xl font-bold">Check Your Voter Registration</h3>
          <p className="text-gray-700">
            Make sure you are registered to vote well before election day. Check
            your voter registration status online or contact your local election
            board to confirm that you are registered and your information is up
            to date.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-green-500 px-4  h-10 w-10 flex justify-center items-center rounded-full text-white font-bold">
          3
        </div>
        <div>
          <h3 className="text-xl font-bold">Learn About the Candidates</h3>
          <p className="text-gray-700">
            Educate yourself about the candidates and their positions on the
            issues that matter most to you. Check out their campaign websites,
            attend rallies and debates, and read news articles and social media
            posts about the candidates.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-green-500 px-4  h-10 w-10 flex justify-center items-center rounded-full text-white font-bold">
          4
        </div>
        <div>
          <h3 className="text-xl font-bold">Vote on Election Day</h3>
          <p className="text-gray-700">
            On election day, go to your assigned polling location and cast your
            ballot. Make sure to bring a valid form of identification and follow
            all voting rules and regulations.
          </p>
        </div>
      </div>
    </div>
  );
};
export default VotingInformation;
