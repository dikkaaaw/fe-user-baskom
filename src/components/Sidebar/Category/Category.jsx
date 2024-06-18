import PropTypes from "prop-types";
import Input from "../../Input";
import "./Category.css";

function Category({ handleChange, categories }) {
  return (
    <div>
      <h2 className="sidebar-title ms-4">Kategori</h2>
      <div className="ms-4">
        <label className="sidebar-label-container">
          <input
            onChange={handleChange}
            type="radio"
            value=""
            name="category"
          />
          <span className="checkmark"></span>All
        </label>
        {categories.map((category) => (
          <Input
            key={category.id}
            handleChange={handleChange}
            value={category.name}
            title={category.name}
            name="category"
          />
        ))}
      </div>
    </div>
  );
}

Category.propTypes = {
  handleChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Category;
