import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Spinner from "../../../components/Shared/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import useRole from "../../../hooks/useRole";

const AllSeller = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [userRole, isUserRoleLoading] = useRole(user?.email);
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_apiUrl}/users?role=seller&email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      setDataLoading(false);
      return data;
    },
  });

  if (isUserRoleLoading) {
    return <Spinner />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  const handleDelete = (seller) => {
    console.log(seller.name);
    const consent = confirm(`Do you want to verify ${seller.name}`);

    if (consent) {
      fetch(
        `${import.meta.env.VITE_apiUrl}/users?id=${seller._id}&role=seller`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result.deletedCount > 0) {
            toast.success(`${seller.name} is removed.`);
            refetch();
          }
        });
    }
  };

  const handleVerify = (seller) => {
    const consent = confirm(`Do you want to verify ${seller.name}`);

    if (consent) {
      fetch(`${import.meta.env.VITE_apiUrl}/verify?id=${seller._id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result.modifiedCount > 0) {
            toast.success(`${seller.name} is a verified seller now.`);
            refetch();
          }
        });
    }
  };
  return (
    <div>
      {dataLoading ? (
        <Spinner />
      ) : sellers.length === 0 ? (
        <div className="min-h-[300px] flex justify-center items-center w-full">
          <p className="text-center text-3xl">There is no seller to display.</p>
        </div>
      ) : (
        <>
          <div className="w-full sm:px-6 mt-10">
            <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
              <div className="sm:flex items-center justify-between">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  All Sellers
                </h2>
              </div>
            </div>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="h-16 w-full text-md leading-none text-gray-800">
                    <th className="font-bold text-left pl-4"></th>
                    <th className="font-bold text-left pl-4">Seller</th>
                    <th className="font-bold text-left pl-12">Email</th>
                    <th className="font-bold text-left pl-12">
                      Verified Status
                    </th>
                    <th className="font-bold text-left pl-20">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {sellers.map((seller, i) => (
                    <tr
                      key={seller._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td>{i + 1}</td>
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10">
                            <img className="w-full h-full" src={seller.image} />
                          </div>
                          <div className="pl-4">
                            <p className="font-medium">{seller.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {seller.email}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">
                          {seller.isVerified ? "Verified" : "Not Verified"}
                        </p>
                      </td>
                      <td className="pl-20">
                        <button
                          onClick={() => handleDelete(seller)}
                          className="btn btn-sm bg-red-500 border-none rounded-lg text-white"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="pl-20">
                        {seller.isVerified ? (
                          <button className="btn border-none hover:bg-green-500 bg-green-500 btn-sm w-28 rounded-lg">
                            Verified
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleVerify(seller);
                            }}
                            className="btn btn-primary btn-sm w-28 rounded-lg"
                          >
                            Verify
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

export default AllSeller;
