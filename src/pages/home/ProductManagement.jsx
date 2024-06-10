// src/pages/ManageProducts.js
import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductManagement = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a description of product 1",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a description of product 2",
      price: 150,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a description of product 3",
      price: 200,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container px-4 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center">Manage Products</h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
