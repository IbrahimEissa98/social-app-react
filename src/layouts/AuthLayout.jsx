import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const bgImage = "../../public/low-poly-grid-haikei.svg";
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
