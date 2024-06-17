import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

const AddProductModal = ({ show, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      fetchCategories();
      document.body.classList.add("overflow-hidden"); // Menambahkan kelas overflow-hidden ke body saat modal dibuka
    } else {
      document.body.classList.remove("overflow-hidden"); // Menghapus kelas overflow-hidden dari body saat modal ditutup
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Menghapus kelas overflow-hidden dari body saat komponen dibersihkan
    };
  }, [show]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
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
    if (price < 0) newErrors.price = "Price cannot be negative";
    if (!qty) newErrors.qty = "Quantity is required";
    if (qty < 0) newErrors.qty = "Quantity cannot be negative";
    if (selectedCategories.length === 0 && !newCategory)
      newErrors.categories = "Please select or enter at least one category";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all fields and select or enter a category.");
      return;
    }

    const token = localStorage.getItem("token");
    let categoryIds = selectedCategories;

    if (newCategory) {
      try {
        const response = await axios.post(
          `${API_URL}/categories`,
          { name: newCategory },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        categoryIds = [...selectedCategories, response.data.id];
      } catch (error) {
        toast.error("Failed to create new category!");
        console.error(error);
        return;
      }
    }

    const productData = {
      name,
      description,
      price,
      qty,
      categoryIds,
    };

    try {
      await axios.post(`${API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <ToastContainer />
      <div className="relative w-full max-w-lg p-6 mx-auto overflow-y-auto bg-white rounded-lg shadow-lg h-[650px]">
        <h2 className="mb-4 text-2xl font-semibold text-center">Add Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Name</label>
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
            <label className="block mb-2 text-sm font-semibold">
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
            <label className="block mb-2 text-sm font-semibold">
              Price (Rupiah)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={price}
              onChange={(e) => setPrice(Math.max(0, e.target.value))}
              required
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={qty}
              onChange={(e) => setQty(Math.max(0, e.target.value))}
              required
            />
            {errors.qty && <p className="text-sm text-red-500">{errors.qty}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">
              Categories
            </label>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter new category?"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            {errors.categories && (
              <p className="text-sm text-red-500">{errors.categories}</p>
            )}
          </div>
          <div className="flex justify-center gap-2 mt-6">
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
