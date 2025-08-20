import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function MainLayout({ toggleTheme }) {
  const { user } = useContext(isLoginContext);
  return (
    <>
      <NavbarComponent toggleTheme={toggleTheme} />
      <main className="min-h-screen bg-gray-200 dark:bg-base-dark font-segue">
        <div className="sm:px-0 mx-auto flex justify-between pt-2 w-full sm:pt-5 relative">
          {/*  */}
          <div className="hidden lg:block relative min-w-[180px] max-w-[260px] basis-[260px] z-20">
            <div className="fixed left-0">
              <div className="h-screen px-6  border-r border-divider min-w-[180px] max-w-[260px] ">
                <Link to={`/profile`} className="">
                  <img
                    src={user?.photo}
                    className="w-[180px] h-[180px] rounded-full"
                    alt=""
                  />
                  <h3 className="text-center mt-2 text-2xl">{user?.name}</h3>
                </Link>
              </div>
            </div>
          </div>

          <div className="min-w-full md:min-w-xl xl:min-w-2xl max-w-full md:max-w-xl xl:max-w-2xl pb-10">
            <Outlet />
          </div>

          <div className="hidden md:block relative  min-w-[180px] max-w-[260px] basis-[260px] z-20">
            <div className="fixed right-0">
              <div className="h-screen px-6  border-l border-divider min-w-[180px] max-w-[260px]">
                ADS
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </main>
    </>
  );
}
