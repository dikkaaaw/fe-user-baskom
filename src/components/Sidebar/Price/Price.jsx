import PropTypes from "prop-types";
import Input from "../../Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <div className="ms-4">
      <h2 className="sidebar-title price-title">Harga</h2>
      <label className="sidebar-label-container">
        <input
          onChange={handleChange}
          className="radio"
          type="radio"
          value=""
          name="price"
        />
        <span className="checkmark"></span>All
      </label>
      <Input
        handleChange={handleChange}
        value="50"
        title="Rp0 - 50 ribu"
        name="price"
      />
      <Input
        handleChange={handleChange}
        value="100"
        title="Rp50 ribu - 100 ribu"
        name="price"
      />
      <Input
        handleChange={handleChange}
        value="150"
        title="Rp100 ribu - 150 ribu"
        name="price"
      />
      <Input
        handleChange={handleChange}
        value="200"
        title="Rp150 ribu - 200 ribu"
        name="price"
      />
      <Input
        handleChange={handleChange}
        value="200+"
        title="> Rp200 ribu"
        name="price"
      />
    </div>
  );
};

Price.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Price;
