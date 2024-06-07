import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";
import "./LoginModal.css";

const LoginModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="alert-icon">
          <FaExclamationTriangle size={40} />
        </div>
        <p>
          To continue you must login first! <br /> Proceed to Login page?
        </p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="p-2 px-5 text-white rounded-md bg-slate-900 btn"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
