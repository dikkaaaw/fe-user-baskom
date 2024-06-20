import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpgradeAccountModal from "../../components/UpgradeAccountModal/UpgradeAccountModal";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          phoneNumber: response.data.phone_number,
          address: response.data.address,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?background=random&size=512&name=${user?.name}`;

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const phoneNumberRegex = /^\+62\d{10,12}$/;
      if (!phoneNumberRegex.test(formData.phoneNumber)) {
        throw new Error(
          "Phone number must start with +62 and followed by 10 to 12 digits"
        );
      }

      const response = await axios.put(
        `${API_URL}/profile`,
        {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      toast.success("Success update profile!", {
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Update profile failed. Please try again.", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      console.error("Error updating profile: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />
      <div className="p-6 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">User Profile</h1>
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
          >
            Back to Home
          </button>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full p-6 bg-gray-100 rounded-lg lg:w-1/4">
            <ul className="space-y-4">
              <li>
                <a href="/user-profile" className="font-semibold text-gray-60 ">
                  User Profile
                </a>
              </li>
              <li>
                <a
                  href="/manage-products"
                  className="text-gray-600 hover:text-black"
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
          <div className="flex flex-col flex-1 gap-6 lg:flex-row">
            <div className="flex flex-col items-center w-full lg:w-1/4">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-32 h-32 mb-4 rounded-full"
              />
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.phone_number}</p>
            </div>
            <div className="w-full lg:w-3/4">
              <div className="p-6 mb-6 bg-gray-100 rounded-lg">
                <h3 className="mb-4 text-lg font-semibold">
                  General Information
                </h3>
                <form>
                  <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div>
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
                    </div>
                    <div>
                      <label htmlFor="roles" className="block text-gray-600">
                        Role
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      >
                        {user.roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name} - {role.description}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-gray-600"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {error && (
                        <div className="text-sm text-center text-red-500">
                          {error}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-gray-600">
                        Address
                      </label>
                      <textarea
                        id="address"
                        rows="4"
                        onChange={handleChange}
                        value={formData.address}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded me-3"
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </button>
                  <div className="relative inline-block">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Upgrade Account
                    </button>
                    <div
                      className="inline-block ml-2"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <span className="text-xl text-gray-500 cursor-pointer">
                        ?
                      </span>
                      {showTooltip && (
                        <div className="absolute w-64 p-2 mt-2 text-sm text-white transform -translate-x-1/2 bg-gray-700 rounded-lg shadow-lg left-1/2">
                          To upgrade your account, please go to the settings
                          page and select the &quot;Upgrade&quot; option. Follow
                          the instructions to complete the process.
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg">
                <h3 className="mb-4 text-lg font-semibold">Security</h3>
                <form>
                  <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user.email}
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-gray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value="********"
                        className="w-full p-2 border border-gray-300 rounded"
                        disabled
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpgradeAccountModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <LogoutModal show={showLogoutModal} onClose={handleCloseModal} />
    </div>
  );
};

export default UserProfile;
