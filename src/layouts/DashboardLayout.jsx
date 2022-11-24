import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const DashboardLayout = () => {
  const [show, setShow] = useState(false);

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
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            <li>
              <Link to="/dashboard/add-product">Add Product</Link>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
