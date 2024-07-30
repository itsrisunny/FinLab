import { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import authenticationService from "./authenticationService";

const RoleWrapper = ({ role, children, setMenuAccess }) => {
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    authenticationService.getCurrentUser(role).then((userRole) => {
      console.log(userRole);
      setCurrentUserRole(userRole?.role);
      setMenuAccess(userRole);
      if (
        userRole?.role !== role ||
        ((localStorage.getItem("isLogin") === "true" ||
          localStorage.getItem("isPartnerLogin") === "true") &&
          userRole?.status === 0)
      ) {
        setRedirect(true);
      }
    });
  }, []);

  if (redirect) {
    if (role === "Admin") {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem("userLoginType");
      localStorage.removeItem("adminId");
      return <Navigate to="/admin/login" replace />;
    }
    if (role === "Partner") {
      localStorage.removeItem("isPartnerLogin");
      localStorage.removeItem("partner_name");
      localStorage.removeItem("partner_email");
      localStorage.removeItem("partner_id");
      localStorage.removeItem("id");
      return <Navigate to="/partners/login" replace />;
    }
  }

  if (currentUserRole === role) {
    return children;
  }

  return null; // or a loading indicator, or an error message, etc.
};

export default RoleWrapper;
