import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(20, "Name must be at most 20 characters")
      .regex(
        /^([A-Za-z']+([ ]?[A-Za-z]+)*){5,20}$/,
        "Invalid characters at Name"
      ),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is invalid"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
        "password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
    dateOfBirth: zod
      .string()
      .nonempty("Date of birth is required")
      .refine(
        (date) => {
          const birthYear = new Date(date).getFullYear();
          const nowYear = new Date().getFullYear();
          const age = nowYear - birthYear;
          return age > 18;
        },
        { message: "You must be at least 18 years old" }
      ),
    gender: zod
      .string()
      .nonempty("Gender is required")
      .regex(/^(male|female)$/, "Enter valid gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Confirm password not match password",
    path: ["rePassword"],
  });
