import React, { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../services/loginAuth";
import { addToast } from "@heroui/toast";

export const isLoginContext = createContext();

export default function IsLoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") != null);
  const [user, setUser] = useState(null);

  async function getLoggedUserData() {
    const response = await getLoggedUserDataApi();
    if (response.message == "success") {
      setUser(response.user);
    } else if (response.message == "Network Error") {
      addToast({
        title: `Network Error`,
      });
    } else {
      setIsLogin(false);
      localStorage.removeItem("token");
      addToast({
        title: `Invalid Token, Try to login again`,
      });
    }
  }

  useEffect(() => {
    if (isLogin) {
      getLoggedUserData();
    } else {
      setUser(null);
    }
  }, [isLogin]);

  return (
    <isLoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </isLoginContext.Provider>
  );
}
