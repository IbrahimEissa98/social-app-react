import * as zod from "zod";

export const changePasswordSchema = zod
  .object({
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
        "password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    newPassword: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
        "password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: zod.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Confirm password not match password",
    path: ["rePassword"],
  });
