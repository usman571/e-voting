import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-500">
      <div className="flex flex-col items-center justify-center h-full pt-10">
        <h1 className="text-white text-5xl font-bold mb-8">
          Welcome To Blockchian Based Voting System
        </h1>
        <div className="flex space-x-8">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => navigate("/user-login")}
          >
            User Login
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => navigate("/admin-login")}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
