import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

const DetailSellerProductModal = ({ show, onClose, product }) => {
  const [newImageFile, setNewImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(product ? product.image : null);

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleUpdateImage = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("files", newImageFile);

    try {
      const response = await axios.post(`${API_URL}/product-images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const newImageUrl = response.data[0].url;
      setImageUrl(newImageUrl);

      // Simpan URL gambar ke local storage
      localStorage.setItem("productImage", newImageUrl);

      console.log("New image URL:", newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("productImage");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      {product && (
        <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <button
            className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex">
            <div className="w-1/2 p-4">
              <img
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Product Image"
                className="object-cover w-full h-auto rounded-lg"
              />
              <input
                type="file"
                id="newImage"
                onChange={handleImageChange}
                className="mt-2"
              />
              <button
                onClick={handleUpdateImage}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
              >
                Add Image
              </button>
            </div>
            <div className="w-1/2 p-4">
              <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
              <div className="flex justify-between">
                <p className="mb-2">
                  <strong>Price</strong>
                </p>
                <p>Rp. {product.price}</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-2">
                  <strong>Stock</strong>
                </p>
                <p>{product.qty}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Category</strong>
                </p>
                <p>
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </p>
              </div>
              <div className="mb-2">
                <p>
                  <strong>Description</strong>
                </p>
                <div className="p-2 break-words whitespace-pre-wrap border rounded">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DetailSellerProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default DetailSellerProductModal;
