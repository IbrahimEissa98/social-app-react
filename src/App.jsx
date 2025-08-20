import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import PostDetailsPage from "./pages/PostDetailsPage";
import { useEffect, useState } from "react";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute";
import ProtectedMainRoute from "./protectedRoutes/ProtectedMainRoute";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (!("theme" in localStorage)) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
      }
    }
    if ("theme" in localStorage) {
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else if (localStorage.theme === "light") {
        setTheme("light");
      }
    }
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    if (theme == "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: (
            <ProtectedAuthRoute>
              <LoginPage toggleTheme={toggleTheme} />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuthRoute>
              <SignupPage toggleTheme={toggleTheme} />
            </ProtectedAuthRoute>
          ),
        },
      ],
    },
    {
      path: "",
      element: <MainLayout toggleTheme={toggleTheme} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedMainRoute>
              <FeedPage />
            </ProtectedMainRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedMainRoute>
              <ProfilePage />
            </ProtectedMainRoute>
          ),
        },
        {
          path: "post-details/:id",
          element: (
            <ProtectedMainRoute>
              <PostDetailsPage />
            </ProtectedMainRoute>
          ),
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
