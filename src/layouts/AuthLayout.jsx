import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div
        className={`flex justify-center py-16 min-h-screen bg-[url(../../public/low-poly-grid-haikei.svg)] bg-no-repeat bg-cover`}
      >
        <Outlet />
      </div>
    </>
  );
}
