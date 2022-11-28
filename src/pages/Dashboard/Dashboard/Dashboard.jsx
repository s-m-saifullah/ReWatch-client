import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../../../components/Shared/Spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import useRole from "../../../hooks/useRole";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, isUserRoleLoading] = useRole(user?.email);

  if (loading || isUserRoleLoading) {
    return <Spinner />;
  }

  if (userRole) {
    console.log(userRole === "buyer");
    if (userRole === "admin") {
      return <Navigate to="/dashboard/all-sellers" />;
    }
    if (userRole === "seller") {
      return <Navigate to="/dashboard/add-product" />;
    }
    if (userRole === "buyer") {
      return <Navigate to="/dashboard/my-orders" />;
    }
  }
};

export default Dashboard;
