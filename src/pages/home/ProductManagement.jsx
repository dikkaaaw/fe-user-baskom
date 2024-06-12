import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
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
                <a href="#" className="font-semibold text-red-500">
                  Sign out
                </a>
              </li>
            </ul>
          </aside>
          <div className="flex flex-col flex-1 gap-6 lg:flex-row">
            <div className="flex flex-col items-center w-full ms-10 lg:w-1/4">
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                {products.length === 0 ? (
                  <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">
                      No products found. Add a product.
                    </h2>
                    <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
                      Add Product
                    </button>
                  </div>
                ) : (
                  <div className="p-6 bg-white rounded-lg shadow-lg">
                    <img
                      src={products.image}
                      alt="Product Image"
                      className="w-32 h-32 mb-4"
                    />
                    <h2 className="text-xl font-semibold">{products.name}</h2>
                    <div className="flex gap-1 mt-4">
                      <button className="px-3 py-2 text-white bg-gray-500 rounded">
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 text-white bg-blue-500 rounded">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-white bg-red-500 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
