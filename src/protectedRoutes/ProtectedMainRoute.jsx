import React, { useContext } from "react";
import { isLoginContext } from "../contexts/IsLoginContext";
import { Navigate } from "react-router-dom";

export default function ProtectedMainRoute({ children }) {
  const { isLogin } = useContext(isLoginContext);
  return isLogin ? children : <Navigate to="/login" />;
}
