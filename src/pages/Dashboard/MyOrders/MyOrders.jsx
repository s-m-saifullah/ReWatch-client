import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import Spinner from "../../../components/Shared/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_apiUrl}/bookings?email=${user?.email}`
      );
      const data = await res.json();
      await setLoading(false);
      return data;
    },
  });

  console.log(bookings);
  const handleDelete = (booking) => {
    const consent = confirm("Do you want to delete the product?");
    console.log(consent);
    if (confirm) {
      fetch(
        `${import.meta.env.VITE_apiUrl}/bookings?id=${booking._id}&productId=${
          booking.productId
        }`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.bookingDelete.deletedCount > 0) {
            toast.success("Booking Cancelled");
            refetch();
          }
        });
    }
  };

  const handlePromote = (id) => {
    fetch(`${import.meta.env.VITE_apiUrl}/promote?id=${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        refetch();
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
                    <th className="font-normal text-left pl-12">seller</th>
                    <th className="font-normal text-left pl-12">
                      Resell Price
                    </th>
                    <th className="font-normal text-left pl-20">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {bookings.map((booking, i) => (
                    <tr
                      key={booking._id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">{i + 1}</td>
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10">
                            <img
                              className="w-full h-full"
                              src={booking.image}
                            />
                          </div>
                          <div
                            className="pl-4 tooltip"
                            data-tip={booking.productName}
                          >
                            <p className="font-medium">
                              {booking.productName.slice(0, 35) + "..."}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {booking.seller}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{booking.price}</p>
                      </td>

                      <td className="pl-20">
                        <button
                          onClick={() => handleDelete(booking)}
                          className="btn btn-sm bg-red-500 border-none rounded-lg text-white"
                        >
                          Cancel
                        </button>
                      </td>
                      <td className="pl-20">
                        {booking.paid ? (
                          <button className="btn border-none hover:bg-green-500 bg-green-500 btn-sm w-28 rounded-lg">
                            Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handlePromote(booking._id);
                            }}
                            className="btn btn-primary btn-sm w-28 rounded-lg"
                          >
                            Pay
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

export default MyOrders;
