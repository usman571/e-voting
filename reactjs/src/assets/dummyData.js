import {
  FaEdit,
  FaInfoCircle,
  FaPoll,
  FaVoteYea,
  FaUserCog,
  FaUserPlus,
} from "react-icons/fa";

import { BiLogOut } from "react-icons/bi";
export const candidates = [
  {
    id: "1",
    name: "Imran khan",
    party: "PTI",
    img: "https://i.pinimg.com/474x/4d/06/d7/4d06d78828f43c90d1968e7600a2e543.jpg",
    votes: 50,
  },
  {
    id: "2",
    name: "Bilawal Bhotto",
    party: "PPP",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bilawal_Bhutto_Zardari.png",
    votes: 15,
  },
  {
    id: "3",
    name: "Nawaz Shareef",
    party: "PMLN",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/46/PrimeMinisterNawazSharif.jpg",
    votes: 20,
  },
];
export const userSidebarNavLinks = [
  {
    id: 1,
    label: "Information",
    icon: FaInfoCircle,
    path: "/voter-information",
  },
  {
    id: 2,
    label: "Voter Registration",
    icon: FaEdit,
    path: "/voter-registration",
  },
  {
    id: 3,
    label: "Voting Area",
    icon: FaVoteYea,
    path: "/voting-area",
  },
  {
    id: 4,
    label: "Result",
    icon: FaPoll,
    path: "/voting-result",
  },
];
export const AdminSidebarNavLinks = [
  {
    id: 2,
    label: "Candidate Details",
    icon: FaEdit,
    path: "/candidate-details",
  },
  {
    id: 1,
    label: "Add Candidate",
    icon: FaUserPlus,
    path: "/add-candidate",
  },
  {
    id: 3,
    label: "Election Phase",
    icon: FaVoteYea,
    path: "/change-phase",
  },
];
