import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import Spinner from "../../../components/Shared/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import useRole from "../../../hooks/useRole";

const MyProducts = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [userRole, isUserRoleLoading] = useRole(user?.email);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_apiUrl}/products?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 401) {
          logout();
        }
        const data = await res.json();
        setDataLoading(false);
        return data;
      } catch (error) {}
    },
  });
  if (isUserRoleLoading) {
    return <Spinner />;
  }

  if (userRole !== "seller") {
    return <Navigate to="/" />;
  }
  const handleDelete = (product) => {
    const consent = confirm("Do you want to delete the product?");
    console.log(consent);
    if (confirm) {
      fetch(`${import.meta.env.VITE_apiUrl}/products?id=${product._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("Product Deleted");
            refetch();
          }
        });
    }
  };

  const handlePromote = (id) => {
    fetch(
      `${import.meta.env.VITE_apiUrl}/products/promote?id=${id}&email=${
        user?.email
      }`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        refetch();
      });
  };

  return (
    <div>
      {dataLoading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <div className="min-h-[300px] flex justify-center items-center w-full">
          <p className="text-center text-3xl">
            You don't have any product to display.{" "}
            <Link to="/dashboard/add-product" className="text-indigo-700">
              Add some products first.
            </Link>
          </p>
        </div>
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
                  <tr className="h-16 w-full text-md leading-none text-gray-800">
                    <th className="font-bold text-left pl-4">Product</th>
                    <th className="font-bold text-left pl-12">Condition</th>
                    <th className="font-bold text-left pl-12">Resell Price</th>
                    <th className="font-bold text-left pl-12">Status</th>
                    <th className="font-bold text-left pl-20">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
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
                          {product.productCondition}
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
                          onClick={() => handleDelete(product)}
                          className="btn btn-sm bg-red-500 border-none rounded-lg text-white"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="pl-10">
                        {product.status !== "available" ? (
                          <button className="btn border-none hover:bg-gray-500 bg-gray-500 btn-sm w-28 rounded-lg">
                            Unavailable
                          </button>
                        ) : product.promoted ? (
                          <button className="btn border-none hover:bg-green-500 bg-green-500 btn-sm w-28 rounded-lg">
                            Promoted
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handlePromote(product._id);
                            }}
                            className="btn btn-primary btn-sm w-28 rounded-lg"
                          >
                            Promote
                          </button>
                        )}
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

export default MyProducts;
