import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProductModal = ({ show, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      fetchCategories();
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://baskom-api.up.railway.app/api/v1/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!price) newErrors.price = "Price is required";
    if (!qty) newErrors.qty = "Quantity is required";
    if (!selectedCategory) newErrors.selectedCategory = "Category is required";

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all fields and select a category.");
      return;
    }

    const token = localStorage.getItem("token");
    const productData = {
      name,
      description,
      price,
      qty,
      categoryIds: [selectedCategory],
    };

    try {
      await axios.post(
        "https://baskom-api.up.railway.app/api/v1/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added successfully!", {
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
      toast.error("Failed to add product!");
      console.error(error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <ToastContainer />
      <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Add Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Price (Rupiah)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
            {errors.qty && <p className="text-sm text-red-500">{errors.qty}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.selectedCategory && (
              <p className="text-sm text-red-500">{errors.selectedCategory}</p>
            )}
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProductModal;
