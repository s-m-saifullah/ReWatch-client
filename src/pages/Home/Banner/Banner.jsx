import React, { useState } from "react";
import bannerBg from "../../../assets/bannerBg.png";
import banner from "../../../assets/banner.jpg";

const Banner = () => {
  return (
    <>
      <div className="relative w-full h-full pb-10">
        <div className="hidden md:block">
          <img
            className="absolute bg-cover bg-center w-full h-full inset-0"
            src={bannerBg}
            alt=""
          />
        </div>
        <div className="relative px-4 xl:px-0 container mx-auto md:flex items-center gap-8">
          <div className="text-color w-full md:w-1/3 pt-16 lg:pt-32 xl:pt-12">
            <h1 className="text-4xl md:text-4xl lg:text-6xl w-11/12 lg:w-11/12 xl:w-full xl:text-6xl text-gray-900 font-extrabold f-f-l">
              Get the Watch You Like to Watch
            </h1>
            <div className="f-f-r text-base lg:text-base pb-20 sm:pb-0 pt-10 xl:pt-6">
              <h2>
                Have you cherish to have a particular watch for a long time but
                don't have the budget? Browse our used watch website and grab
                that watch.
              </h2>
            </div>
            <div className="lg:flex">
              <a
                href="#home-categories"
                className="hidden md:block hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg text-center"
              >
                Browse Categories
              </a>
            </div>
          </div>
          <img
            className="w-full mt-8 object-fill md:w-2/3 md:-ml-4 lg:-ml-4 xl:ml-0"
            src={banner}
            alt="sample page"
            role="img"
          />
          <a
            href="#home-categories"
            className="md:hidden hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4  bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg text-center block"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
