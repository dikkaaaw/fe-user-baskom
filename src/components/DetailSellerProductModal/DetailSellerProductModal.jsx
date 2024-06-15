import PropTypes from "prop-types";

const DetailSellerProductModal = ({ show, isClose }) => {
  return <div>Ini modal</div>;
};

DetailSellerProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isClose: PropTypes.func.isRequired,
};

export default DetailSellerProductModal;
