import React from "react";
import { Navigate, Outlet } from "react-router-native";

const PrivateOutlet = () => {
  return false ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateOutlet;
