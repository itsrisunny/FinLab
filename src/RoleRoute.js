import { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import authenticationService from "./authenticationService";

const RoleWrapper = ({ role, children, setMenuAccess }) => {
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    authenticationService.getCurrentUser(role).then((userRole) => {
      setCurrentUserRole(userRole?.role);
      setMenuAccess(userRole);
      if (userRole?.role !== role) {
        setRedirect(true);
      }
    });
  }, []);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  if (currentUserRole === role) {
    return children;
  }

  return null; // or a loading indicator, or an error message, etc.
};

export default RoleWrapper;
