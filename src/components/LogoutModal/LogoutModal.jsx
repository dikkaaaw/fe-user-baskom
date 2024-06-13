import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import PropTypes from "prop-types";
import "./LogoutModal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutModal = ({ show, onClose }) => {
  const [, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logout success!", {
      closeOnClick: true,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  if (!show) return null;
  return (
    <>
      {show && (
        <div className="modal-overlay">
          <ToastContainer />
          <div className="modal-logout">
            <div className="alert-icon">
              <FaExclamationTriangle size={40} />
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

LogoutModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogoutModal;
