import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaVoteYea, FaEdit, FaInfoCircle, FaPoll } from "react-icons/fa";
import { sidebarNavLinks } from "../../assets/dummyData";

const Navigation = () => {
  return (
    <nav className="w-1/6 h-screen bg-purple-800 flex flex-col items-center">
      <div className="flex flex-col items-center w-full pt-8">
        <div className="rounded-full w-20 h-20 bg-white mb-4"></div>
        <h3 className="text-white font-bold text-xl mb-2">Admin Name</h3>
        <p className="text-gray-400 text-sm">Admin Role</p>
      </div>
      <ul className="w-full py-4 space-y-4">
        {sidebarNavLinks.map((link) => (
          <li
            key={link.id}
            className="px-4 cursor-pointer py-2 rounded-md hover:bg-purple-700 transition duration-200 flex items-center"
          >
            <Link to={link.path} className="text-white flex items-center">
              <link.icon className="text-white w-6 h-6 mr-2" />
              <span className="text-white font-medium">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
