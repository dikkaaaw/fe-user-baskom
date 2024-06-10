// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm m-4 overflow-hidden rounded shadow-lg">
      <img className="w-full" src={product.image} alt={product.name} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{product.name}</div>
        <p className="text-base text-gray-700">{product.description}</p>
        <p className="text-lg font-bold text-gray-900">
          Price: ${product.price}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Edit
        </button>
        <button className="px-4 py-2 ml-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
