import React from "react";
import { userSidebarNavLinks } from "../../assets/dummyData";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../features/user/userSlice";
import { setCurrentAdmin } from "../../features/user/adminSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    dispatch(setCurrentAdmin({role:'admin'}))
    // localStorage.clear();
    navigate("/");
  };
  return (
    <div className="h-screen bg-purple-800 flex flex-col items-center gap-3">
      <ul className="w-full py-4 ">
        {userSidebarNavLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.id}
            className="w-full py-4 space-y-8"
          >
            <li className="px-4 text-white cursor-pointer py-[14px] rounded-md hover:bg-purple-700 transition duration-200 flex items-center">
              <link.icon className="w-5 h-5 mr-2" />
              <span className="font-medium text-smd">{link.label}</span>
            </li>
          </NavLink>
        ))}
        <li
          className="px-4  text-white cursor-pointer py-[14px] rounded-md hover:bg-purple-700 transition duration-200 flex items-center"
          onClick={handleLogout}
        >
          <BiLogOut className="w-5 h-5 mr-2" />
          <span className="font-medium text-smd">logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
