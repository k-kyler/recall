import React from "react";
import { Navigate, Outlet } from "react-router-native";

const PublicOutlet = () => {
  return true ? <Outlet /> : <Navigate to="/todo-list" />;
};

export default PublicOutlet;
