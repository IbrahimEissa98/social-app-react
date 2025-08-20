import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import logo from "../assets/images/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { isLoginContext } from "../contexts/IsLoginContext";
import ToggleTheme from "./ToggleTheme";

export const BeSocialLogo = () => {
  return (
    <img src={logo} className="bg-black w-8 h-8 rounded-full border-2" alt="" />
  );
};

export default function NavbarComponent({ toggleTheme }) {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(isLoginContext);

  return (
    <Navbar className=" shadow-md dark:bg-post-dark *:max-w-full">
      <NavbarBrand justify="start">
        <Link className="flex items-center" to={"/"}>
          <BeSocialLogo />
          <p className="font-bold text-inherit ml-2 font-mono">BeSocial</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            to={`/profile`}
            className="flex items-center text-gray-800 dark:text-slate-200 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <i className="fa-solid fa-user me-1.5"></i>
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isLogin ? (
          <NavbarItem>
            <Button
              as={Link}
              onPress={() => {
                navigate("/login");
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                setIsLogin(false);
              }}
              color="danger"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} color="success" to={"/login"} variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to={"/register"} variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <ToggleTheme toggleTheme={toggleTheme} />
      </NavbarContent>
    </Navbar>
  );
}
