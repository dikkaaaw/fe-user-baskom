import PropTypes from "prop-types";
import "./DetailProductModal.css";

const DetailProductModal = ({ show, onClose }) => {
  const dummyProduct = {
    name: "Dummy Product",
    description: "This is a dummy product",
    price: 10.99,
    condition: "New",
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
              <div className="ml-6 product-info">
                <h2 className="text-3xl">{dummyProduct.name}</h2>
                <p className="mt-6 product-description pe-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat ipsam unde obcaecati quam qui aut cupiditate nesciunt
                  asperiores quibusdam eaque? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Vero, rem?
                </p>
                <div className="flex justify-between mt-10 pe-6">
                  <p>Price </p>
                  {dummyProduct.price}
                </div>
                <div className="flex justify-between pe-6">
                  <p>Condition</p>
                  {dummyProduct.condition}
                </div>
                <div className="flex justify-between pe-6">
                  <p>Stock</p>
                  {dummyProduct.stock}
                </div>
                <button className="mt-10 add-to-cart-btn">
                  Chat dengan penjual
                </button>
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
