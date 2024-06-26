import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Navigation from "../../components/Navigation/Nav";
import Products from "../../components/Products/Products";
// import Recommended from "../../components/Recommended/Recommended";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import "../../index.css";

const API_URL = "https://baskom-api.up.railway.app/api/v1";

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const filterProducts = (products, category, price, search) => {
    return products.filter((product) => {
      const matchCategory = category
        ? product.categories.some((c) => c.name === category)
        : true;
      const matchPrice =
        price === "50"
          ? product.price <= 50000
          : price === "100"
            ? product.price > 50000 && product.price <= 100000
            : price === "150"
              ? product.price > 100000 && product.price <= 150000
              : price === "200"
                ? product.price > 150000 && product.price <= 200000
                : price === "200+"
                  ? product.price > 200000
                  : true;

      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchPrice && matchSearch;
    });
  };

  const filteredProducts = filterProducts(
    products,
    selectedCategory,
    selectedPrice,
    searchQuery
  );

  return (
    <>
      <Sidebar
        handleCategoryChange={handleCategoryChange}
        handlePriceChange={handlePriceChange}
        categories={categories}
      />
      <Navigation handleInputChange={handleInputChange} query={searchQuery} />
      {/* <Recommended /> */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Products result={filteredProducts} />
      )}
    </>
  );
}

export default Dashboard;
