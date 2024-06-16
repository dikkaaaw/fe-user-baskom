import PropTypes from "prop-types";

const DetailSellerProductModal = ({ show, onClose, product }) => {
  if (!show || !product) return null;

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
              alt="product Image"
              className="object-cover w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
            <div className="flex justify-between">
              <p className="mb-2">
                <strong>Price</strong>
              </p>
              <p>${product.price}</p>
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
                {product.categories.map((category) => category.name).join(", ")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="mb-2">
                <strong>Description</strong>
              </p>
              <p>{product.description}</p>
            </div>
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
    qty: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};

export default DetailSellerProductModal;
