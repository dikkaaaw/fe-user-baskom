import PropTypes from "prop-types";

const DetailSellerProductModal = ({ show, onClose, product }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
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
              src={product.image || "https://via.placeholder.com/150"}
              alt="Product Image"
              className="object-cover w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
            <p className="mb-2">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailSellerProductModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default DetailSellerProductModal;
