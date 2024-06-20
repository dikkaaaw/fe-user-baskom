import PropTypes from "prop-types";

const DetailSellerProductModal = ({ show, onClose, product }) => {
  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      {product && (
        <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <button
            className="absolute text-3xl text-gray-600 top-2 right-4 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex">
            <div className="w-1/2 p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Product Image"
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-1/2 p-4">
              <h2 className="mb-4 text-2xl font-bold underline">
                {product.name}
              </h2>

              <div className="flex justify-between">
                <p className="mb-2">
                  <strong>Price</strong>
                </p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </p>
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
