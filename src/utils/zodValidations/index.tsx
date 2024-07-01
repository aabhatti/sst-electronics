import * as z from "zod";
import { ERRORS, GENERIC } from "../constants";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "./common";
import { passwordRegex } from "./regex";

const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, ERRORS.PASSWORD_REQUIRED),
});

export const registerSchema = z
  .object({
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    email: emailValidation,
    password: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
    confirmPassword: z.string().refine((value) => passwordRegex.test(value), {
      message: ERRORS.NEW_PASSWORD_INVALID,
    }),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.PASSWORD_NOT_MATCHED,
        path: [GENERIC.CONFIRM_PASSWORD],
      });
    }
  });

export { loginSchema };
