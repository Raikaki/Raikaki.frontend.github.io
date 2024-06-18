import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ roles }) => {
  const token = Cookies.get("jwt_token");
  const location = useLocation();
  if (!token) {
    window.location.href = "http://localhost:3000/NotAuthorized";
  }
  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.scope.split(" ");
    if (roles && !roles.some((role) => userRoles.includes(role))) {
      window.location.href = "http://localhost:3000/NotAuthorized";
      return null;
    }
    return <Outlet />;
  } catch (error) {
    window.location.href = "http://localhost:3000/NotAuthorized";
  }
};

export default PrivateRoute;
