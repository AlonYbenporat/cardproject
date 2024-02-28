import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children, isAdmin, isBusiness }) {
  const isLoggedin = localStorage.getItem("isLoggedin") === "true";

  if (!isLoggedin) {
    return <Navigate to="/" />;
  }

  if (isAdmin && isBusiness) {
    
    return children;
  }

  if (isAdmin && !isBusiness) {
   
    return children;
  }
  if (!isAdmin && isBusiness) {
    return children;
  }

  return <Navigate to="/" />;
}
export default Protected;
