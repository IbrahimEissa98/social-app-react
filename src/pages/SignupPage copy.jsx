import React, { useState } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import ToggleTheme from "../components/ToggleTheme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { registerApi } from "../services/registerAuth";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage({ toggleTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onTouched",
    // reValidateMode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    // console.log(formData);
    setIsLoading(true);
    const response = await registerApi(formData);
    // console.log(response);

    if (response.error) {
      setErrMsg(response.error);
      setSuccMsg("");
    } else {
      setErrMsg("");
      setSuccMsg(response.message);
    }

    setIsLoading(false);

    if (!response.error) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <div className={`md:min-w-3/4 lg:min-w-1/2  border-8 rounded-[40px]`}>
        <div className="w-full h-fit px-10 py-12 backdrop-blur-lg shadow-2xl bg-black/30 rounded-4xl">
          <div className="absolute top-2.5 hover:animate-pulse animate-bounce left-1/2 -translate-x-1/2">
            <ToggleTheme toggleTheme={toggleTheme} />
          </div>
          <h2 className="text-center pb-6 font-bold text-4xl text-shadow-lg text-shadow-white">
            Register Page
          </h2>
          <Form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative w-full">
              <Input
                // isRequired
                className=""
                label="Name"
                type="text"
                {...register("name")}
                isInvalid={Boolean(errors.name?.message)}
                errorMessage={errors.name?.message}
              />
            </div>
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
              <Input
                // isRequired
                className=""
                label="Password"
                type="password"
                {...register("password")}
                isInvalid={Boolean(errors.password?.message)}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="w-full relative">
              <Input
                // isRequired
                className=""
                label="Confirm Password"
                type="password"
                {...register("rePassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be at least 8 characters",
                  },
                })}
                isInvalid={Boolean(errors.rePassword?.message)}
                errorMessage={errors.rePassword?.message}
              />
            </div>
            <div className="w-full relative">
              <Input
                // isRequired
                className=""
                label="Date Of Birth"
                type="date"
                {...register("dateOfBirth", {
                  required: "Date Of Birth is required",
                })}
                isInvalid={Boolean(errors.dateOfBirth?.message)}
                errorMessage={errors.dateOfBirth?.message}
              />
            </div>
            <div className="w-full relative">
              <Select
                // isRequired
                className=""
                label="Gender"
                {...register("gender", {
                  required: "Gender is required",
                })}
                isInvalid={Boolean(errors.gender?.message)}
                errorMessage={errors.gender?.message}
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            </div>
            <div className="w-full">
              <Link className="text-blue-500 ms-auto block w-fit" to={"/login"}>
                already have account?
              </Link>
              <Button
                type="submit"
                variant="bordered"
                // color="default"
                className="mx-auto text-white bg-emerald-500 font-bold tracking-wider flex justify-center items-center"
                isLoading={isLoading}
              >
                Register
              </Button>
              {errMsg && (
                <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {errMsg}
                </p>
              )}
              {succMsg && (
                <p className="text-center text-sm bg-green-400 text-green-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {succMsg}
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
