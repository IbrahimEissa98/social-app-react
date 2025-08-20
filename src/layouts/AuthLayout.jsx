import React from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/images/low-poly-grid-haikei.svg";

export default function AuthLayout() {
  return (
    <>
      <div
        className={`flex justify-center py-16 min-h-screen bg-[url(${bgImage})] bg-no-repeat bg-cover`}
      >
        <Outlet />
      </div>
    </>
  );
}
