import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils"; 

const PublicRoute = ({ component: Component, ...rest }) => {
  return isLogin() ? <Navigate to={"/"} /> : <Component {...rest} />;
};

export default PublicRoute;
