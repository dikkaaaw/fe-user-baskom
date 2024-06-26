import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

const UpgradeAccountModal = ({ isOpen, closeModal }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 400 || img.height > 400) {
          setError("Image dimensions should not exceed 400x400 pixels.");
        } else {
          setFormData(file);
          setError("");
        }
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) {
      setError("Document is required");
      return;
    }

    const formDataApi = new FormData();
    formDataApi.append("file", formData);

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/upgrade-roles`, formDataApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Upgrade request submitted successfully!", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
        onClose: () => {
          closeModal();
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error submitting upgrade request: ", error);
      toast.error("Failed to submit upgrade request.", {
        autoClose: 1500,
        closeOnClick: true,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="z-10 w-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {step === 1 && (
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Benefits of Upgrading
            </h2>
            <ul className="mb-6 space-y-2 list-disc list-inside">
              <li>Access to premium features</li>
              <li>Priority customer support</li>
              <li>Exclusive content and offers</li>
              <li>And much more...</li>
            </ul>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              How to Upgrade Your Account
            </h2>
            <ol className="mb-6 space-y-2 list-decimal list-inside">
              <li>Prepare the required documents.</li>
              <li>Click the &quot;Next&quot; button to proceed.</li>
              <li>Fill out the form with necessary details.</li>
              <li>Upload the required documents.</li>
              <li>
                Click the &quot;Submit&quot; button to complete the process.
              </li>
            </ol>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 bg-gray-300 rounded"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-blue-500 rounded"
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-semibold text-center">
              Upgrade Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block font-semibold text-black"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={user.phone_number}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block font-semibold text-black"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-gray-600 bg-gray-300 rounded"
                >
                  Back
                </button>
                <div className="flex">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

UpgradeAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UpgradeAccountModal;
