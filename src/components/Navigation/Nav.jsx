import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { AiOutlineUser } from "react-icons/ai";
import LoginModal from "../LoginModal/LoginModal";
import LogoutModal from "../LogoutModal/LogoutModal";
import "./Nav.css";

const Nav = ({ handleInputChange, query }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleDropdownClickOutside);

    return () => {
      window.removeEventListener("click", handleDropdownClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleProfileClick = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search.."
        />
      </div>
      <div className="profile-container">
        <Link to="/home">
          <p className="title">Home</p>
        </Link>
        <Link to="/about-us">
          <p className="title">About Us</p>
        </Link>
        <div ref={dropdownRef} className="relative">
          <AiOutlineUser
            className="cursor-pointer nav-icons"
            onClick={handleDropdownToggle}
          />
          {dropdownOpen && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-md">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <a
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={(e) => handleProfileClick(e, "/user-profile")}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      <LogoutModal show={showLogoutModal} onClose={handleCloseModal} />
    </nav>
  );
};

Nav.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Nav;
