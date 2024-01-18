import React from "react";
import { useRoutes } from "react-router-dom";
import { candidates } from "../../assets/dummyData";
import VoterRegistration from "../../components/user/VoterRegistration";
import VotingInformation from "../../components/user/VotingInformation";
import VotingArea from "../../components/user/VotingArea";
import VotingResult from "../../components/user/VotingResult";
import AddCandidates from "../../components/admin/AddCandidates";
import CandidatesList from "../../components/admin/CandidatesList";
import ElectionPhase from "../../components/admin/ElectionPhase";

const Dashboard = () => {
  const routes = useRoutes([
    { path: "voting-area", element: <VotingArea candidates={candidates} /> },
    { path: "voter-registration", element: <VoterRegistration /> },
    { path: "voter-information", element: <VotingInformation /> },
    { path: "voting-result", element: <VotingResult /> },
    { path: "add-candidate", element: <AddCandidates /> },
    { path: "candidate-details", element: <CandidatesList /> },
    { path: "change-phase", element: <ElectionPhase /> },
  ]);

  return <>{routes ? routes : <VotingInformation />}</>;
};

export default Dashboard;
