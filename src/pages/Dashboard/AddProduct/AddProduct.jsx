import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../../components/Shared/Spinner";
import LoadingButton from "../../../components/Shared/LoadingButton";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_apiUrl}/categories`).then((res) =>
        res.json()
      ),
  });

  let years = [];
  for (let i = new Date().getFullYear(); i >= 2000; i--) {
    years.push(i);
  }

  const handleAddProduct = (data) => {
    setIsLoading(true);

    const productData = {
      ...data,
      seller: user.displayName,
      sellerEmail: user.email,
      timePosted: format(new Date(), "PPp"),
      usedFor: new Date().getUTCFullYear() - parseInt(data.purchaseYear),
    };

    console.log(productData);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_apiKey
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const uploadedImg = imgData.data.display_url;
        delete productData.image;
        productData.image = uploadedImg;
        fetch(`${import.meta.env.VITE_apiUrl}/products`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success("Product Added");
            setIsLoading(false);
          });
      });
  };

  return (
    <div className="w-11/12 md:w-1/2 lg:ml-20 mt-10">
      <div className="space-y-4">
        <h2 className="mb-3 text-2xl font-bold">Add Product</h2>

        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              type="text"
              placeholder="Product Name"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
            {errors.productName && (
              <p role="alert" className="text-red-600">
                {errors.productName?.message}
              </p>
            )}
          </div>

          {/* Product Prices */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("purchasePrice", {
                  required: "Purchase price is required",
                })}
                type="number"
                placeholder="Purchase Price"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.purchasePrice && (
                <p role="alert" className="text-red-600">
                  {errors.purchasePrice?.message}
                </p>
              )}
            </div>

            <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("resellPrice", {
                  required: "Resell price is required",
                })}
                type="number"
                placeholder="Resell Price"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.resellPrice && (
                <p role="alert" className="text-red-600">
                  {errors.resellPrice?.message}
                </p>
              )}
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("sellerLocation", {
                  required: "Location is required",
                })}
                type="text"
                placeholder="Seller Location"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.sellerLocation && (
                <p role="alert" className="text-red-600">
                  {errors.sellerLocation?.message}
                </p>
              )}
            </div>

            <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("sellerPhone", {
                  required: "Phone Number is required",
                })}
                type="number"
                placeholder="Phone Number"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.sellerPhone && (
                <p role="alert" className="text-red-600">
                  {errors.sellerPhone?.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mb-5">
            <label>Watch Category</label>
            <select
              {...register("categoryName", {
                required: "Category name is required",
              })}
              className="select select-bordered w-full bg-transparent"
            >
              <option>Pick A Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryName && (
              <p role="alert" className="text-red-600">
                {errors.categoryName?.message}
              </p>
            )}
          </div>

          <div className="w-full mb-5">
            <label>Product Purchase Year</label>
            <select
              {...register("purchaseYear", {
                required: "Purchase year is required",
              })}
              className="select select-bordered w-full bg-transparent"
            >
              <option>Pick A Year</option>
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.purchaseYear && (
              <p role="alert" className="text-red-600">
                {errors.purchaseYear?.message}
              </p>
            )}
          </div>

          <div className="ml-3 mb-5">
            <label className="inline-block mb-3">Product Condition</label>
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <input
                  {...register("productCondition", {
                    required: "Product condition is required",
                  })}
                  id="excellent"
                  type="radio"
                  name="productCondition"
                  className="radio"
                  value="excellent"
                  checked
                />
                <label htmlFor="excellent">Excellent</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  {...register("productCondition", {
                    required: "Product condition is required",
                  })}
                  id="good"
                  type="radio"
                  name="productCondition"
                  value="good"
                  className="radio"
                />{" "}
                <label htmlFor="good">Good</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  {...register("productCondition", {
                    required: "Product condition is required",
                  })}
                  id="fair"
                  type="radio"
                  name="productCondition"
                  value="fair"
                  className="radio"
                />{" "}
                <label htmlFor="fair">Fair</label>
              </div>
            </div>
            {errors.productCondition && (
              <p role="alert" className="text-red-600">
                {errors.productCondition?.message}
              </p>
            )}
          </div>

          <div className="w-full ml-3 mb-5">
            <label htmlFor="">Photo</label>
            <input
              {...register("image", {
                required: "Image is required",
              })}
              type="file"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
            {errors.image && (
              <p role="alert" className="text-red-600">
                {errors.image?.message}
              </p>
            )}
          </div>

          {/* Product Description */}
          <div className="w-full rounded-lg bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
            <textarea
              {...register("productDescription", {
                required: "Email is required",
              })}
              type="text"
              placeholder="Product Description"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
            />
            {errors.productDescription && (
              <p role="alert" className="text-red-600">
                {errors.productDescription?.message}
              </p>
            )}
          </div>

          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              className="w-full hover:opacity-90 text-base xl:text-base py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg"
            >
              Add Product
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
