import { PropTypes } from "prop-types";

const Card = ({ img, name, price, qty, onClick }) => {
  return (
    <>
      <section className="card" onClick={onClick}>
        <img src={img} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">
            <strong>{name}</strong>
          </h3>
          <div className="flex justify-between">
            <p>Price</p>
            <div>{price}</div>
          </div>
          <div className="flex justify-between">
            <p>Stock</p>
            <div>{qty}</div>
          </div>
        </div>
      </section>
    </>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
