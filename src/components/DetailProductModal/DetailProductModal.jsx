import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import LoginModal from "../LoginModal/LoginModal";
import axios from "axios";
import "./DetailProductModal.css";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

const DetailProductModal = ({ show, onClose, productId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${API_URL}/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleChatWithSeller = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      window.location.href = "https://wa.me/";
    }
  };

  if (!show) return null;
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={() => onClose(false)}>
            &times;
          </button>
          <div className="product-details">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <button className="flex items-center gap-2 p-2 px-4 mt-4 border border-black rounded-md">
                <span>
                  <FaLocationDot />
                </span>
                Yogyakarta
              </button>
            </div>
            <div className="ml-6 product-info">
              <h2 className="mb-2 text-3xl">{product.name}</h2>
              <div className="mb-2">
                <div className="p-2 break-words whitespace-pre-wrap border rounded">
                  {product.description}
                </div>
              </div>
              <div className="flex justify-between mt-10 pe-6">
                <p>Price </p>
                Rp. {product.price}
              </div>
              <div className="flex justify-between pe-6">
                <p>Condition</p>
                {product.condition}
              </div>
              <div className="flex justify-between pe-6">
                <p>Stock</p>
                {product.qty}
              </div>
              <div className="flex justify-between">
                <span></span>
                <button
                  onClick={handleChatWithSeller}
                  className="p-2 px-4 mt-10 border border-black rounded-md add-to-cart-btn hover:bg-black hover:text-white"
                >
                  Chat dengan penjual
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

DetailProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.number,
};

export default DetailProductModal;
