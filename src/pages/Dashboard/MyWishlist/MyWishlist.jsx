import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Shared/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyWishlist = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { data: wishlistProducts = [], refetch } = useQuery({
    queryKey: ["wishlistProducts"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_apiUrl}/products/wishlist?email=${user?.email}`
      );
      const data = await res.json();
      await setLoading(false);
      return data;
    },
  });
  const handleRemoveWishlist = (email, product) => {
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
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full sm:px-6 mt-10">
            <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  My Products
                </h2>
              </div>
            </div>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="h-16 w-full text-sm leading-none text-gray-800">
                    <th className="font-normal text-left pl-4"></th>
                    <th className="font-normal text-left pl-4">Product</th>
                    <th className="font-normal text-left pl-12">Category</th>
                    <th className="font-normal text-left pl-12">
                      Resell Price
                    </th>
                    <th className="font-normal text-left pl-12">Status</th>
                    <th className="font-normal text-left pl-20">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {wishlistProducts.map((product, i) => (
                    <tr
                      key={product._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td>{i + 1}</td>
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10">
                            <img
                              className="w-full h-full"
                              src={product.image}
                            />
                          </div>
                          <div
                            className="pl-4 tooltip"
                            data-tip={product.productName}
                          >
                            <p className="font-medium">
                              {product.productName.slice(0, 35) + "..."}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {product.categoryName}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">${product.resellPrice}</p>
                      </td>
                      <td className="pl-12">
                        <button className="font-medium capitalize ">
                          {product.status}
                        </button>
                      </td>
                      <td className="pl-20">
                        <button
                          onClick={() =>
                            handleRemoveWishlist(user?.email, product)
                          }
                          className="btn btn-sm bg-red-500 border-none rounded-lg text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyWishlist;