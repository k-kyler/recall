import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
import LogIn from "../pages/public/LogIn";
import Register from "../pages/public/Register";
import ForgotPassword from "../pages/public/ForgotPassword";
import NotFound from "../pages/public/NotFound";
import TodoList from "../pages/private/TodoList";
import PublicOutlet from "./PublicOutlet";
import PrivateOutlet from "./PrivateOutlet";

const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route index element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/todo-list" element={<PrivateOutlet />}>
          <Route index element={<TodoList />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </NativeRouter>
  );
};

export default Router;
