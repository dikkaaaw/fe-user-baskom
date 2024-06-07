import { useState } from "react";
import PropTypes from "prop-types";
import DetailProductModal from "../DetailProductModal/DetailProductModal";
import "./Product.css";

const Products = ({ result }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };
  return (
    <>
      <section onClick={handleModal} className="card-container">
        {result}
      </section>
      <DetailProductModal show={showDetailModal} onClose={handleCloseModal} />;
    </>
  );
};

Products.propTypes = {
  result: PropTypes.array.isRequired,
};

export default Products;
