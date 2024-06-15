import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditProductModal = ({ show, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show && product) {
      console.log("Setting form data with product:", product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        qty: product.qty,
      });
    }
  }, [show, product]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.qty) newErrors.qty = "Quantity is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all fields.");
      return;
    }

    console.log("Submitting form data:", formData);

    const token = localStorage.getItem("token");

    if (!product || !product.id) {
      toast.error("Product ID is missing.");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      qty: formData.qty,
    };

    try {
      await axios.put(
        `https://baskom-api.up.railway.app/api/v1/products/${product.id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product edited successfully!", {
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      toast.error("Failed to update product!");
      console.error("Error updating product:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
        <ToastContainer />
        <h2 className="mb-4 text-2xl font-semibold">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="qty" className="block text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              id="qty"
              value={formData.qty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.qty && <p className="text-sm text-red-500">{errors.qty}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  }),
};

export default EditProductModal;
