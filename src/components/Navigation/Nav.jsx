import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      console.log("Navigasi ke halaman profile");
    }
  };

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
        <Link to="/faq">
          <p className="title">FAQ</p>
        </Link>
        <Link to="about-us">
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
                    onClick={handleProfileClick}
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={handleProfileClick}
                  >
                    Kelola Produk
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={handleProfileClick}
                  >
                    Upgrade Akun
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
