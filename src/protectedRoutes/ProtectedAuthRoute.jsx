import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function ProtectedAuthRoute({ children }) {
  const { isLogin } = useContext(isLoginContext);
  return isLogin ? <Navigate to="/" /> : children;
}
