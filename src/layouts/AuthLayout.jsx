import React from "react";
import { Outlet } from "react-router-dom";
// import bgImage from "../assets/images/low-poly-grid-haikei.svg";

export default function AuthLayout() {
  const bgImageUrl = "/public/low-poly-grid-haikei.svg"; // Adjust the path as needed
  return (
    <>
      <div
        className={`auth-container flex justify-center py-16 min-h-screen bg-[url(${bgImageUrl})] bg-no-repeat bg-cover`}
      >
        <Outlet />
      </div>
    </>
  );
}
