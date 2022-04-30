import React from "react";
import { StatusBar } from "expo-status-bar";
import Router from "./src/navigation/Router";
import AuthProvider from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar />
      <Router />
    </AuthProvider>
  );
}
