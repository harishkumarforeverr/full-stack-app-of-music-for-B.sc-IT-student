import React from "react";
import { Navigate } from "react-router-dom"; 
import { isLogin } from "../utils";

const PrivateRoute = ({ component: Component, visibleSide = true, ...rest }) => {
  return (
    // Show the component and sidebar only when the user is logged in
    // Otherwise, Navigate the user to / page

    isLogin() ? ( 
        <Component {...rest} /> 
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default PrivateRoute;
