import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const ProductCategory = () => {
  const products = useLoaderData();
  return (
    <div className="2xl:container 2xl:mx-auto my-20">
      <h2 className="text-center text-4xl font-semibold">Single Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-20">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
