import PropTypes from "prop-types";
import "./DetailProductModal.css";

const DetailProductModal = ({ show, onClose }) => {
  const dummyProduct = {
    name: "Dummy Product",
    description: "This is a dummy product",
    price: 10.99,
    stock: 50,
    image: "https://via.placeholder.com/150",
  };

  if (!show) return null;
  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => onClose(false)}>
              &times;
            </button>
            <div className="product-details">
              <div className="product-image">
                <img src={dummyProduct.image} alt={dummyProduct.name} />
              </div>
              <div className="product-info">
                <h2>{dummyProduct.name}</h2>
                <p>{dummyProduct.description}</p>
                <p>Price: {dummyProduct.price}</p>
                <p>Stock: {dummyProduct.stock}</p>
              </div>
            </div>
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
