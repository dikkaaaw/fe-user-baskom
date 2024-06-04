import PropTypes from "prop-types";
import "./Product.css";

const Products = ({ result }) => {
  return (
    <>
      <section className="card-container">{result}</section>
    </>
  );
};

Products.propTypes = {
  result: PropTypes.array.isRequired,
};

export default Products;
