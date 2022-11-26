import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "../../ProductCategory/ProductCard/ProductCard";

const PromotedProducts = () => {
  const { data: promotedProducts = [] } = useQuery({
    queryKey: ["promotedProducts"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_apiUrl}/products/promoted?promoted=true`
      ).then((res) => res.json()),
  });
  return (
    <>
      {promotedProducts.length > 0 ? (
        <div className="pb-16 my-20">
          <div className="flex justify-center items-center ">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full ">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                    Advertised Products
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-14 gap-20">
                  {promotedProducts.slice(0, 2).map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PromotedProducts;
