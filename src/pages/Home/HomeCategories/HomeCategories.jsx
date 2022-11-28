import React from "react";
import { useQuery } from "@tanstack/react-query";
import HomeCategoryCard from "../HomeCategoryCard/HomeCategoryCard";

const HomeCategories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_apiUrl}/categories`).then((res) =>
        res.json()
      ),
  });
  console.log(categories);
  return (
    <div className="pb-16 my-20">
      <div className="flex justify-center items-center ">
        <div className="2xl:mx-auto 2xl:container px-4 sm:px-6 xl:px-20 2xl:px-0 w-full ">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-2">
              <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Shop By Category
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-14 gap-20">
              {categories.map((category) => (
                <HomeCategoryCard key={category._id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
