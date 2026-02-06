import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useContext(AuthContext);

  // If user is not authenticated, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized, render the component
  return children;
};

export default ProtectedRoute;
