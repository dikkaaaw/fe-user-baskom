import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import Category from "./Category/Category";
import Price from "./Price/Price";
import imgLogo from "../assets/img-logo-2.png";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <Link to="/home">
            <img src={imgLogo} alt="logo" className="logo" />
          </Link>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
      </section>
    </>
  );
};

Sidebar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Sidebar;
