import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

function NormalUserRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <>Loading...</>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "normal") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default NormalUserRoute;
