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
                src={product.image}
                alt={product.name}
                className="card-img"
              />
              <div className="card-details">
                <h3 className="card-title">
                  <strong>{product.name}</strong>
                </h3>
                <div className="flex justify-between">
                  <p>Harga</p>
                  <div className="font-semibold">Rp. {product.price}</div>
                </div>
                <div className="flex justify-between">
                  <p>Stock</p>
                  <div className="font-semibold">{product.qty}</div>
                </div>
                <div className="flex flex-col">
                  <p className="mt-2">Kategori</p>
                  <div className="px-2 mt-1 rounded-xl bg-slate-200">
                    {" "}
                    <i>
                      {product.categories
                        .map((category) => category.name)
                        .join(", ")}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="product-not-found">
          {" "}
          <i>Product not found..</i>
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
