import React, { useState } from "react";
import { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgMenuLeftAlt } from "react-icons/cg";

import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-light.svg";
import { AuthContext } from "../../contexts/AuthProvider";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userRole, isUserRoleLoading] = useRole(user?.email);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const menuItem = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-gray-100">
      <div className="2xl:container 2xl:mx-auto py-5 lg:px-7 sm:px-6 px-4">
        <nav>
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-5">
              {path === "dashboard" && (
                <label
                  htmlFor="dashboard-drawer"
                  className="drawer-button drawer-overlay lg:hidden"
                >
                  <CgMenuLeftAlt className="text-xl" />
                </label>
              )}

              <Link to="/" className="flex items-center">
                <img className="w-16" src={Logo} alt="" />
                <h2 className=" font-bold text-xl leading-5 text-gray-800">
                  ReWatch
                </h2>
              </Link>
            </div>

            {/* For large (i.e. desktop and laptop sized screen) */}

            <div className=" hidden sm:flex items-center gap-5">
              {!isUserRoleLoading && userRole && (
                <p>
                  You're {userRole.startsWith("a") ? "an " : "a "}
                  <span className="btn btn-sm rounded-lg bg-indigo-700 border-none capitalize">
                    {userRole}
                  </span>
                </p>
              )}

              <ul className="flex xl:pl-4 lg:pl-3 justify-end flex-row sm:space-x-4 md:space-x-6 lg:space-x-3 xl:space-x-4">
                {menuItem}
              </ul>
              {user?.uid && (
                <div className="w-16 lg:mb-0 mr-4">
                  <img
                    src={user?.photoURL}
                    alt={user.displayName}
                    className="h-full w-full rounded-full overflow-hidden shadow"
                  />
                </div>
              )}
            </div>

            {/* Burger Icon */}
            <div
              id="bgIcon"
              onClick={() => setShow(!show)}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex sm:hidden items-center gap-5 cursor-pointer"
            >
              <FaBars className={`${show ? "hidden" : ""} text-xl`} />
              <FaTimes className={`${show ? "block" : "hidden"} text-xl`} />
              {user?.uid && (
                <div className="w-10 lg:mb-0 mr-4">
                  <img
                    src={user?.photoURL}
                    alt={user.displayName}
                    className="h-full w-full rounded-full overflow-hidden shadow"
                  />
                </div>
              )}
            </div>
          </div>
          {/* for medium-sized devices */}

          {/* Mobile and Small devices Navigation */}
          <div
            id="MobileNavigation"
            className={`${
              show ? "block" : "hidden"
            } transform duration-150 sm:hidden mt-4`}
          >
            {!isUserRoleLoading && userRole && (
              <p className="mb-2">
                You're {userRole.startsWith("a") ? "an " : "a "}
                <span className="btn btn-sm rounded-lg bg-indigo-700 border-none capitalize">
                  {userRole}
                </span>
              </p>
            )}
            <hr className=" w-full bg-gray-300" />

            <ul className="flex flex-col gap-4 mt-4 max-w-sm mx-auto ">
              {menuItem}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
