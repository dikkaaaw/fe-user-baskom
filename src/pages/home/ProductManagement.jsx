import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import EditProductModal from "../../components/EditProductModal/EditProductModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import DetailSellerProductModal from "../../components/DetailSellerProductModal/DetailSellerProductModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailProductModal, setShowDetailProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://baskom-api.up.railway.app/api/v1/products/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      // Ensure that the response is an array
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAddModal = () => {
    setShowAddProductModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddProductModal(false);
  };

  const handleOpenDetailModal = (product) => {
    setSelectedProduct(product);
    setShowDetailProductModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedProduct(null);
    setShowDetailProductModal(false);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setShowEditProductModal(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://baskom-api.up.railway.app/api/v1/products/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(
        products.filter((product) => product.id !== selectedProduct.id)
      );
      toast.success("Successfully delete product!", {
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        setShowDeleteModal(false);
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      <div className="p-6 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Kelola Product</h1>
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Back to Home
          </button>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full p-6 bg-gray-100 rounded-lg lg:w-1/4">
            <ul className="space-y-4">
              <li>
                <a
                  href="/user-profile"
                  className="text-gray-600 hover:text-black"
                >
                  User Profile
                </a>
              </li>
              <li>
                <a
                  href="/manage-products"
                  className="font-semibold text-gray-600"
                >
                  Kelola Product
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="font-semibold text-red-500"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </aside>
          <div className="flex flex-col items-center w-full lg:w-3/4">
            <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg">
              {products.length === 0 ? (
                <div className="p-6 bg-white rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold">
                    No products found. Add a product.
                  </h4>
                  <button
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                    onClick={handleOpenAddModal}
                  >
                    Add Product
                  </button>
                </div>
              ) : (
                <div className="flex flex-row flex-wrap gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-white rounded-lg shadow-lg w-60"
                    >
                      <img
                        src={product.image}
                        alt="Product Image"
                        className="object-cover w-full h-32 mb-4"
                      />
                      <h4 className="font-semibold text-md">{product.name}</h4>
                      <div className="flex justify-between">
                        <h5 className="text-sm font-medium">Harga</h5>
                        <h4 className="text-sm font-medium">{product.price}</h4>
                      </div>
                      <div className="flex justify-between">
                        <h5 className="text-sm font-medium">Stock</h5>
                        <h4 className="text-sm font-medium">{product.qty}</h4>
                      </div>
                      <p className="inline-block px-4 text-sm text-black bg-gray-300 rounded-xl">
                        {product.categories
                          .map((category) => category.name)
                          .join(", ")}
                      </p>
                      <div className="flex gap-1 mt-4">
                        <button
                          className="px-3 py-2 text-white bg-gray-500 rounded"
                          onClick={() => handleOpenDetailModal(product)}
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded"
                          onClick={() => handleOpenEditModal(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-500 rounded"
                          onClick={() => handleOpenDeleteModal(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {products.length > 0 && (
                <button
                  className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                  onClick={handleOpenAddModal}
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddProductModal
        show={showAddProductModal}
        onClose={handleCloseAddModal}
      />
      <EditProductModal
        show={showEditProductModal}
        onClose={handleCloseEditModal}
        product={selectedProduct}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteProduct}
      />
      <DetailSellerProductModal
        show={showDetailProductModal}
        onClose={handleCloseDetailModal}
        product={selectedProduct}
      />
      <LogoutModal show={showLogoutModal} onClose={handleCloseModal} />
    </div>
  );
};

export default UserProfile;
