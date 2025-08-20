import React, { useContext, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import ToggleTheme from "../components/ToggleTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/loginAuth";
import { loginSchema } from "../schemas/loginSchema";
import PassToggle from "../components/PassToggle";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function LoginPage({ toggleTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(isLoginContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    // reValidateMode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    // console.log(formData);
    setSuccMsg("");
    setErrMsg("");
    setIsLoading(true);
    const response = await loginApi(formData);
    console.log(response);

    if (response.message == "success") {
      setSuccMsg(response.message);
      reset();
      localStorage.setItem("token", response.token);
      setIsLogin(true);
    } else {
      setErrMsg(response.error);
    }

    setIsLoading(false);

    if (!response.error) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <div
        className={`w-11/12 md:w-3/4 lg:w-1/2 relative p-1.5 h-fit circle-border rounded-[38px] overflow-hidden`}
      >
        <div className="relative z-10 w-full h-fit px-4 md:px-10 py-12 backdrop-blur-lg shadow-2xl bg-gray-700 rounded-4xl">
          <div className="absolute top-2.5 hover:animate-pulse animate-bounce left-1/2 -translate-x-1/2">
            <ToggleTheme toggleTheme={toggleTheme} />
          </div>
          <h2 className="text-center pb-6 font-bold text-4xl text-shadow-lg text-shadow-white">
            Login Page
          </h2>
          <Form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full relative">
              <Input
                // isRequired
                className=""
                label="Email"
                type="email"
                {...register("email")}
                isInvalid={Boolean(errors.email?.message)}
                errorMessage={errors.email?.message}
              />
            </div>
            <div className="w-full relative">
              <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                <PassToggle isVisible={isVisible} setIsVisible={setIsVisible} />
              </div>
              <Input
                // isRequired
                className=""
                label="Password"
                type={`${!isVisible ? "password" : "text"}`}
                {...register("password")}
                isInvalid={Boolean(errors.password?.message)}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <Link
                  className="text-blue-500 capitalize italic"
                  to={"/register"}
                >
                  don't have account?
                </Link>
              </div>
              <Button
                type="submit"
                variant="bordered"
                // color="default"
                className="mx-auto text-white bg-emerald-500 font-bold tracking-wider flex justify-center items-center"
                isLoading={isLoading}
              >
                Login
              </Button>
              {errMsg && (
                <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  incorrect email or password
                </p>
              )}
              {succMsg && (
                <p className="text-center text-sm bg-green-400 text-green-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  Welcome Back
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
