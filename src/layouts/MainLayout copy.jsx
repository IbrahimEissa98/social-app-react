import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

export default function MainLayout({ toggleTheme }) {
  return (
    <>
      <NavbarComponent toggleTheme={toggleTheme} />
      <main className="min-h-screen bg-gray-200 dark:bg-base-dark font-segue">
        <div className="container sm:px-0 mx-auto justify-between pt-2 sm:pt-5 relative">
          <div className="hidden lg:block absolute left-0 z-50">
            <div className="fixed">Profile</div>
          </div>
          <div className="mx-auto max-w-full md:max-w-xl xl:max-w-2xl pb-10">
            <Outlet />
          </div>
          <div className="hidden md:block absolute right-0 top-0 z-50">
            <div className="fixed">Ads</div>
          </div>
        </div>
      </main>
    </>
  );
}
