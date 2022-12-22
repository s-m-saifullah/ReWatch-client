import React, { useState } from "react";
import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import { AuthContext } from "../contexts/AuthProvider";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useRole(user?.email);

  const location = useLocation();
  const urlPath = location.pathname.replace("/dashboard/", "");

  return (
    <div>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto lg:px-7 sm:px-6 px-4 h-[89vh] drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content mx-auto md:mx-0 px-2 lg:px-0">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu w-80 bg-base-200 text-base-content">
            {userRole === "admin" ? (
              <>
                <li
                  className={
                    urlPath === "all-sellers"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
                  <Link to="/dashboard/all-sellers">All Sellers</Link>
                </li>
                <li
                  className={
                    urlPath === "all-buyers"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
                  <Link to="/dashboard/all-buyers">All Buyers</Link>
                </li>
              </>
            ) : userRole === "seller" ? (
              <>
                <li
                  className={
                    urlPath === "add-product"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
                  <Link to="/dashboard/add-product">Add Product</Link>
                </li>
                <li
                  className={
                    urlPath === "my-products"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
                  <Link to="/dashboard/my-products">My Products</Link>
                </li>
              </>
            ) : userRole === "buyer" ? (
              <>
                <li
                  className={
                    urlPath === "my-orders"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
                  <Link to="/dashboard/my-orders">My Orders</Link>
                </li>
                <li
                  className={
                    urlPath === "wishlist"
                      ? "bg-indigo-700 text-white"
                      : undefined
                  }
                >
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
