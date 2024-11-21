import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () =>{
    try{
      await logoutUser({}).unwrap();
      dispatch(logout());
      navigate('/');
    }catch(error){
      console.log("failed to log out",error);
    }
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Book Review Hub</Link>
        </div>

        {/* Navigations */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:underline hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/review-book"
            className="hover:underline hover:text-gray-200 transition duration-300"
          >
            My Reviews
          </Link>
          <Link
            to="/review-book"
            className="hover:underline hover:text-gray-200 transition duration-300"
          >
            All Reviews
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => handleLogout()}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) menu.classList.toggle("hidden");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden bg-blue-700 text-white md:hidden space-y-2 py-2"
      >
        <Link
          to="/"
          className="block px-6 py-2 hover:underline hover:text-gray-200 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/review-book"
          className="block px-6 py-2 hover:underline hover:text-gray-200 transition duration-300"
        >
          My Reviews
        </Link>
        <Link
          to="/review-book"
          className="block px-6 py-2 hover:underline hover:text-gray-200 transition duration-300"
        >
          All Reviews
        </Link>
        <button
          onClick={() => navigate("/login")}
          className="block px-6 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
