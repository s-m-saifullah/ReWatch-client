import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";

const ProductCard = ({ product, setPurchase, refetch }) => {
  const { user } = useContext(AuthContext);
  const {
    image,
    isSellerVerified,
    productName,
    purchasePrice,
    resellPrice,
    seller,
    usedFor,
    sellerLocation,
    timePosted,
    productDescription,
    status,
    userWishlisted,
  } = product;

  const handleAddToWishlist = (email) => {
    fetch(`${import.meta.env.VITE_apiUrl}/users/wishlist?email=${email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.userUpdate.modifiedCount > 0) {
          toast.success("Product Added To Wishlist");
          refetch();
        }
      });
  };

  const handleRemoveWishlist = (email) => {
    fetch(`${import.meta.env.VITE_apiUrl}/users/wishlist/?email=${email}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.userUpdate.modifiedCount > 0) {
          toast.success("Product Removed from Wishlist");
          refetch();
        }
      });
  };
  return (
    <div className="mx-2 w-full min-h-[780px] lg:mb-0 mb-8 shadow-lg rounded-xl relative">
      <div>
        <img src={image} className="h-96 mx-auto" />
      </div>
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 pt-4">
          {userWishlisted?.includes(user?.email) ? (
            <div
              onClick={() => handleRemoveWishlist(user?.email)}
              className="flex items-center cursor-pointer"
            >
              <FaHeart className="mr-2 text-red-500" /> Added to Wishlist
            </div>
          ) : (
            <div
              onClick={() => handleAddToWishlist(user?.email)}
              className="flex items-center cursor-pointer"
            >
              <FaRegHeart className="mr-2" /> Add to Wishlist
            </div>
          )}

          <div className="bg-green-700 py-1.5 px-6 rounded-full">
            <p className="text-base text-white">Used: {usedFor}y</p>
          </div>
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
              <p className="text-md text-gray-600 px-2 bg-gray-200 py-1 relative">
                Seller: {seller}
                {isSellerVerified && (
                  <span className="absolute -right-3">
                    <FaCheckCircle className="text-blue-600" />
                  </span>
                )}
              </p>
            </div>
            <div className="pl-2">
              <p className="text-md text-gray-600 px-2 bg-gray-200 py-1">
                Location : {sellerLocation}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between py-4">
            <span className="mr-5">Purchase: ${purchasePrice}</span>
            <h3 className="text-indigo-700 text-xl font-semibold">
              Resell:{"  "}
              <span className="text-5xl">${resellPrice}</span>
            </h3>
          </div>

          {status === "booked" ? (
            <label className="absolute bottom-5 right-5 left-5 block text-center hover:opacity-90 text-base xl:text-base py-4 text-white font-bold bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg cursor-pointer">
              Product Booked
            </label>
          ) : (
            <label
              onClick={() => setPurchase(product)}
              htmlFor="booking-modal"
              className="absolute bottom-5 right-5 left-5 block text-center hover:opacity-90 text-base xl:text-base py-4 text-white font-bold bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg cursor-pointer"
            >
              Book Product
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
