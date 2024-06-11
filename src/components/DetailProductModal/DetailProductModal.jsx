import PropTypes from "prop-types";
import "./DetailProductModal.css";
import { FaLocationDot } from "react-icons/fa6";

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
                <button className="flex items-center gap-2 p-2 px-4 mt-4 border border-black rounded-md">
                  <span>
                    <FaLocationDot />
                  </span>
                  Yogyakarta
                </button>
              </div>
              <div className="ml-6 product-info">
                <h2 className="text-3xl">{dummyProduct.name}</h2>
                <p className="mt-6 text-justify product-description pe-6">
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
                <div className="flex justify-between">
                  <span></span>
                  <button className="p-2 px-4 mt-10 border border-black rounded-md add-to-cart-btn hover:bg-black hover:text-white">
                    Chat dengan penjual
                  </button>
                </div>
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
