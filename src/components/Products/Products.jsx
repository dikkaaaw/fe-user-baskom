import { useState } from "react";
import PropTypes from "prop-types";
import DetailProductModal from "../DetailProductModal/DetailProductModal";
import "./Product.css";

const Products = ({ result }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleModal = (productId) => {
    setSelectedProductId(productId);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedProductId(null);
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      Electronics: "bg-blue-200",
      Accessories: "bg-green-200",
      Clothing: "bg-red-200",
      Furniture: "bg-yellow-200",
      string: "bg-purple-200",
    };
    return colors[categoryName] || "bg-gray-200";
  };

  return (
    <>
      {result.length > 0 ? (
        <section className="card-container">
          {result.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => handleModal(product.id)}
            >
              <img
                src="https://via.placeholder.com/150"
                alt={product.name}
                className="card-img"
              />
              <div className="card-details">
                <h3 className="card-title">
                  <strong>{product.name}</strong>
                </h3>
                <div className="flex justify-between">
                  <p>Harga</p>
                  <div className="font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Stock</p>
                  <div className="font-semibold">{product.qty}</div>
                </div>
                <div className="flex flex-col">
                  <p className="mt-2">Kategori</p>
                  <div className="mt-1 rounded-xl">
                    {product.categories.map((category, index) => (
                      <span
                        key={category.id}
                        className={`inline-block px-6 py-1 rounded-xl ${getCategoryColor(category.name)}`}
                        style={{
                          whiteSpace: "nowrap",
                          marginBottom: "2px",
                        }}
                      >
                        <i>{category.name}</i>
                        {index !== product.categories.length - 1 && (
                          <div style={{ height: "1px" }} />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="product-not-found">
          <i>No Product..</i>
        </div>
      )}
      <DetailProductModal
        show={showDetailModal}
        onClose={handleCloseModal}
        productId={selectedProductId}
      />
    </>
  );
};

Products.propTypes = {
  result: PropTypes.array.isRequired,
};

export default Products;
