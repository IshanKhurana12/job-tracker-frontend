import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "./context/userContextProvider";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user,setuser}=useContext(UserContext);
const navigate=useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 text-gray-200 shadow-lg rounded-lg">
            <div className="container mx-auto flex flex-col items-center p-4 md:flex-row md:justify-between md:p-5">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div className="text-3xl font-extrabold tracking-wide">
                        JOB <span className="text-indigo-400">ट्रैकर</span>
                    </div>
                    <button
                        className="text-gray-200 md:hidden focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <ul
                    className={`flex-col items-center gap-4 text-lg md:flex md:flex-row md:gap-6 ${
                        isMenuOpen ? "flex" : "hidden"
                    }`}
                >
                 {!user ? (
  <li className="hover:text-indigo-400 transition duration-300">
    <Link to="/login">Login</Link>
  </li>
) : (
  <li
    className="hover:text-indigo-400 transition duration-300 cursor-pointer"
    onClick={() => {
      setuser(null); // clear user from context
      navigate("/login"); // redirect
    }}
  >
    Logout
  </li>
)}

                    <li className="hover:text-indigo-400 transition duration-300">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="hover:text-indigo-400 transition duration-300">
                        <Link to="/add">Add</Link>
                    </li>
                    <li className="hover:text-indigo-400 transition duration-300">
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;