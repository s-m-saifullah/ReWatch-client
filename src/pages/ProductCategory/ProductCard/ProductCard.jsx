import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const {
    image,
    isSellerVerified,
    productName,
    purchasePrice,
    resellPrice,
    seller,
    sellerLocation,
    timePosted,
    productDescription,
  } = product;
  console.log(product);
  return (
    <div className="mx-2 w-full lg:mb-0 mb-8 shadow-lg rounded-xl">
      <div>
        <img src={image} className="h-96 mx-auto" />
      </div>
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center cursor-pointer">
            <FaRegBookmark className="mr-2" /> Add to Wishlist
          </div>
          {isSellerVerified && (
            <div className="bg-green-700 py-1.5 px-6 rounded-full">
              <p className="text-base text-white">Verified Seller</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{productName}</h2>
            <p className="text-sm text-gray-600">
              Posted on : {timePosted.split(", 2022,").join()}
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {productDescription.length > 100
              ? productDescription.slice(0, 100) + "..."
              : productDescription}
          </p>
          <div className="flex mt-4 justify-between">
            <div>
              <p className="text-sm text-gray-600 px-2 bg-gray-200 py-1">
                Seller: {seller}
              </p>
            </div>
            <div className="pl-2">
              <p className="text-sm text-gray-600 px-2 bg-gray-200 py-1">
                Location : {sellerLocation}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between py-4">
            <span className="mr-5">Purchase: ${purchasePrice}</span>
            <h3 className="text-indigo-700 text-xl font-semibold">
              Resell:{"  "}
              <span className="text-4xl">${resellPrice}</span>
            </h3>
          </div>
          <button
            type="submit"
            className="w-full hover:opacity-90 text-base xl:text-base py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
