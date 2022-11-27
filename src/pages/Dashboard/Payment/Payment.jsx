import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const Payment = () => {
  const booking = useLoaderData();
  const { productName, price, image } = booking;

  return (
    <div className="flex justify-center items-center sm:px-6 mt-10">
      <div className="py-8 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div className="flex flex-col justify-start items-start w-full space-y-9">
          <div className="flex justify-start flex-col items-start space-y-2">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Checkout
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center  py-7 sm:py-0 xl:py-10 px-10">
              <div className="flex flex-col justify-start items-start w-full space-y-4">
                <p className="text-xl md:text-2xl leading-normal text-gray-800">
                  {productName}
                </p>
                <p className="text-xl font-semibold leading-none text-gray-600">
                  {price}
                </p>
              </div>
              <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                <img src={image} alt={productName} />
              </div>
            </div>

            <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
              <div className="flex flex-row justify-center items-center mt-6">
                <p className="flex flex-shrink-0 px-4 text-xl leading-4 text-gray-800">
                  Pay with card
                </p>
              </div>

              <div className="mt-5">
                <Elements stripe={stripePromise}>
                  <CheckoutForm booking={booking} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
