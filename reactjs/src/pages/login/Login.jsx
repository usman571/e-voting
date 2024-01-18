import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { payload } = await dispatch(loginUser(formData));
      if (!payload) {
        throw new Error();
      }

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 to-purple-500">
      <div className="w-1/2 h-full bg-white flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-3/4 space-y-4">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign in</h2>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Password:
            </label>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={5}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-purple-900 text-white rounded-md hover:bg-purple-700 transition duration-200"
            >
              Sign in
            </button>
            <ToastContainer />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-700 text-sm mr-2">Don't have an account?</p>
            <NavLink to="/user-register">
              <button className="px-6 py-2 bg-white border border-purple-900 text-purple-900 rounded-md hover:bg-purple-900 hover:text-white transition duration-200">
                Sign up
              </button>
            </NavLink>
          </div>
        </form>
      </div>
      <div className="w-1/2 h-full bg-gradient-to-br from-purple-900 to-purple-500 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Make Your Voice Heard
          </h1>
          <p className="text-white text-lg mb-6">
            We believe in democracy and giving people the power to make a
            change. Our online voting system ensures transparency, security, and
            fairness in all elections.
          </p>
          <NavLink to="/user-register">
            <button className="px-6 py-3 bg-white text-purple-900 rounded-md hover:bg-purple-900 hover:text-white transition duration-200">
              Get started
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
