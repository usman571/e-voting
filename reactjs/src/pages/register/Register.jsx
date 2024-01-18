import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate("/user-login"), 2000); // delay the navigation by 2 seconds
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.", {
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
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign up</h2>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength={5}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>
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
              Sign up
            </button>
            <ToastContainer />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-gray-700 text-sm mr-2">Already a member?</p>
            <NavLink to="/user-login">
              <button variant="contained" color="primary">
                Log in
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
