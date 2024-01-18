import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminSlice } from "../../features/user/adminSlice";

const LoginAdmin = () => {
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
      const { payload } = await dispatch(AdminSlice(formData));
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
      <div className="w-1/2 h-full flex items-center justify-center">
        <form
          className="bg-white rounded-lg shadow-md p-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-purple-700"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={5}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-purple-700"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div>
          <p className="text-white text-4xl font-bold mb-6">Welcome Admin</p>
          <p className="text-white text-lg mb-6">
            You can log in to the admin panel using your email and password.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default LoginAdmin;
