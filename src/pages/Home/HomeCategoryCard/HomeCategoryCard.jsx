import React from "react";
import { Link } from "react-router-dom";

const HomeCategoryCard = ({ category }) => {
  return (
    <div className="relative group flex justify-center items-center h-full w-full rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-400">
      <img
        className="object-center object-cover h-full w-full"
        src={category.image}
        alt="shoe-image"
      />
      <Link
        to={`/category/${category._id}`}
        className="text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-white py-3 w-36 bg-indigo-700 rounded-lg"
      >
        {category.categoryName}
      </Link>
      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 rounded-lg py-6 z-0 px-20 w-36 bg-indigo-700 bg-opacity-50" />
    </div>
  );
};

export default HomeCategoryCard;
