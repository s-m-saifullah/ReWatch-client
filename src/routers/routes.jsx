import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers/AllBuyers";
import AllSeller from "../pages/Dashboard/AllSeller/AllSeller";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import ProductCategory from "../pages/ProductCategory/ProductCategory/ProductCategory";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/category/:id",
        element: <ProductCategory />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/all-sellers",
        element: <AllSeller />,
      },
      {
        path: "/dashboard/all-buyers",
        element: <AllBuyers />,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/*",
        element: <ErrorPage />,
      },
    ],
  },
]);
