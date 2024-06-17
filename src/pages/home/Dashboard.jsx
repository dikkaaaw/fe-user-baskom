import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Navigation from "../../components/Navigation/Nav";
import Products from "../../components/Products/Products";
import Recommended from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card";
import axios from "axios";
import "../../index.css";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        const data = response.data;
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems =
    products.length > 0
      ? products.filter(
          (product) =>
            product.title &&
            product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      : [];

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(({ img, name, price, description, qty }) => (
      <Card
        key={Math.random()}
        img={img}
        name={name}
        price={price}
        description={description}
        qty={qty}
      />
    ));
  }

  const result = filteredData(products, selectedCategory, query);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      {isLoading ? <CircularProgress /> : <Products result={result} />}
    </>
  );
}

export default Dashboard;
