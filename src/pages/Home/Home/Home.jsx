import React from "react";
import Banner from "../Banner/Banner";
import HomeCategories from "../HomeCategories/HomeCategories";
import PromotedProducts from "../PromotedProducts/PromotedProducts";

const Home = () => {
  return (
    <div>
      <Banner />
      <PromotedProducts />
      <HomeCategories />
    </div>
  );
};

export default Home;
