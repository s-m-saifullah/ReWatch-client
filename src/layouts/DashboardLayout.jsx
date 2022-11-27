import React, { useState } from "react";
import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Spinner from "../components/Shared/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useRole(user?.email);

  return (
    <div>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto lg:px-7 sm:px-6 px-4 h-[89vh] drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            {userRole === "admin" ? (
              <>
                {" "}
                <li>
                  <Link to="/dashboard/all-sellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/all-buyers">All Buyers</Link>
                </li>
              </>
            ) : userRole === "seller" ? (
              <>
                <li>
                  <Link to="/dashboard/add-product">Add Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/my-products">My Products</Link>
                </li>
              </>
            ) : userRole === "buyer" ? (
              <>
                <li>
                  <Link to="/dashboard/my-orders">My Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/wishlist">My Wishlist</Link>
                </li>
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
