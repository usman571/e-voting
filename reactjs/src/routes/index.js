import LandingPage from "../components/LandingPage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AdminLogin from "../pages/login/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import VoterRegistration from "../components/user/VoterRegistration";
import VotingInformation from "../components/user/VotingInformation";
import VotingResult from "../components/user/VotingResult";
import VotingArea from "../components/user/VotingArea";
import AddCandidates from "../components/admin/AddCandidates";
import ElectionPhase from "../components/admin/ElectionPhase";
import CandidatesList from "../components/admin/CandidatesList";
import { candidates } from "../assets/dummyData";

const routes = [
  { path: "/", element: LandingPage, hideSidebar: true },
  { path: "/user-login", element: Login, hideSidebar: true },
  { path: "/user-register", element: Register, hideSidebar: true },
  { path: "/admin-login", element: AdminLogin, hideSidebar: true },
  { path: "/dashboard/*", element: Dashboard },
  { path: "/voter-registration", element: VoterRegistration },
  { path: "/voter-information", element: VotingInformation },
  { path: "/voting-result", element: VotingResult },
  { path: "/change-phase", element: ElectionPhase },
  { path: "/add-candidate", element: AddCandidates },
  {
    path: "/candidate-details",
    element: CandidatesList,

    candidates: candidates,
  },
  { path: "/voting-area", element: VotingArea, candidates: candidates },
];

export default routes;
