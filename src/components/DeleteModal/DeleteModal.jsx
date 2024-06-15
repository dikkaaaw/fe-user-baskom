import PropTypes from "prop-types";

const DeleteModal = ({ show, onClose }) => {
  return <div>Ini delete modal</div>;
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteModal;
