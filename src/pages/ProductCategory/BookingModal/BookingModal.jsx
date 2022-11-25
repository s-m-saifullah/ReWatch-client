import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ purchase, setPurchase, refetch }) => {
  const { user } = useContext(AuthContext);
  const { displayName, email } = user;
  // const { refetch } = useQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { _id, productName, resellPrice, image, seller, sellerId } = purchase;

  const handleBooking = (data) => {
    console.log(data);
    const bookingData = {
      ...data,
      productId: _id,
      image,
      seller,
      sellerId,
      bookingTime: format(new Date(), "PPp"),
    };

    fetch(`${import.meta.env.VITE_apiUrl}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result.acknowledged) {
          toast.success("Product Booked");
          refetch();
          setPurchase(null);
        }
      });
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle rounded-xl">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-5 text-center">
            Provide Info to Confirm Booking
          </h3>

          <form onSubmit={handleSubmit(handleBooking)}>
            <div className="w-full rounded-lg bg-gray-100 px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Name</label>
              <input
                {...register("buyer")}
                type="text"
                value={displayName}
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
                readOnly
              />
            </div>
            <div className="w-full rounded-lg bg-gray-100 px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Email</label>
              <input
                {...register("buyerEmail")}
                type="text"
                value={email}
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
                readonly
              />
            </div>
            <div className="w-full rounded-lg bg-gray-100 px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Product Name</label>
              <input
                {...register("productName")}
                type="text"
                value={productName}
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
                readonly
              />
            </div>

            <div className="w-full rounded-lg bg-gray-100 px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Resell Price</label>
              <input
                {...register("price")}
                type="text"
                value={`$${resellPrice}`}
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
                readonly
              />
            </div>
            <div className="w-full rounded-lg  px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Meeting Location</label>
              <input
                {...register("meetingLocation", {
                  required: "Meeting location is required",
                })}
                type="text"
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
              />
              {errors.meetingLocation && (
                <p role="alert" className="text-red-600">
                  {errors.meetingLocation?.message}
                </p>
              )}
            </div>
            <div className="w-full rounded-lg px-4 py-1 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <label className="text-base">Phone Number</label>
              <input
                {...register("buyerPhone", {
                  required: "Phone number is required",
                })}
                type="number    "
                className="mt-2 w-full border-none text-lg bg-transparent outline-none focus:outline-none"
              />
              {errors.buyerPhone && (
                <p role="alert" className="text-red-600">
                  {errors.buyerPhone?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-center hover:opacity-90 text-base xl:text-base py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
