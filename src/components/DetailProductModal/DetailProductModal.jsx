import PropTypes from "prop-types";
import "./DetailProductModal.css";

const DetailProductModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => onClose(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

DetailProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DetailProductModal;
