import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";
import ProductCard from "../ProductCard/ProductCard";

const ProductCategory = () => {
  const [purchase, setPurchase] = useState(null);
  const { id } = useParams();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_apiUrl}/categories/${id}`).then((res) =>
        res.json()
      ),
  });

  return (
    <div className="2xl:container 2xl:mx-auto my-20">
      <div>
        <h2 className="text-center text-4xl font-semibold">Single Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-20">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setPurchase={setPurchase}
              refetch={refetch}
            />
          ))}
        </div>
      </div>

      {purchase && (
        <BookingModal
          purchase={purchase}
          setPurchase={setPurchase}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProductCategory;
