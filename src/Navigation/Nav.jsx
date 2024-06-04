import { PropTypes } from "prop-types";
import { AiOutlineUser } from "react-icons/ai";
import "./Nav.css";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search.."
        />
      </div>
      <div className="profile-container">
        <a href="">
          <AiOutlineUser className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Nav;
