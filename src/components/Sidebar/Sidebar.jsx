import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import Category from "./Category/Category";
import Price from "./Price/Price";
import imgLogo from "../../assets/img-logo-2.png";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      {/* <section classNameName="sidebar">
        <div classNameName="logo-container">
          <Link to="/home">
            <img src={imgLogo} alt="logo" classNameName="logo" />
          </Link>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
      </section> */}

      {/* <!-- Component Start --> */}
      <section className="sidebar">
        <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-700 bg-white rounded">
          <a className="flex items-center w-full px-3 mt-3" href="/home">
            <div className="logo-container">
              <Link to="/home">
                <img src={imgLogo} alt="logo" className="logo" />
              </Link>
            </div>
          </a>
          <div className="w-full px-6">
            <div className="w-full mt-3">
              <Category handleChange={handleChange} />
              <Price handleChange={handleChange} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Sidebar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Sidebar;
