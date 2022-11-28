import React from "react";
import Banner from "../Banner/Banner";
import HomeCategories from "../HomeCategories/HomeCategories";
import PromotedProducts from "../PromotedProducts/PromotedProducts";
import Stat from "../Stat/Stat";

const Home = () => {
  return (
    <div>
      <Banner />
      <PromotedProducts />
      <HomeCategories />
      <Stat />
    </div>
  );
};

export default Home;
