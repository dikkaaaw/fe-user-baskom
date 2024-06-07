import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import PropTypes from "prop-types";
import "./LogoutModal.css";

const LogoutModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  if (!show) return null;
  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
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
  onLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
