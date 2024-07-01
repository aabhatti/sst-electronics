import * as z from "zod";
import { ERRORS, LENGTH } from "../constants";
import { nameRegex } from "./regex";

const emailValidation = z
  .string()
  .min(1, { message: ERRORS.EMAIL_REQUIRED })
  .email({ message: ERRORS.EMAIL_INVALID });

const firstNameValidation = z
  .string()
  .min(1, { message: ERRORS.FIRST_NAME_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.FIRST_NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });

const lastNameValidation = z
  .string()
  .min(1, { message: ERRORS.LAST_NAME_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.LAST_NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });

export { emailValidation, firstNameValidation, lastNameValidation };
