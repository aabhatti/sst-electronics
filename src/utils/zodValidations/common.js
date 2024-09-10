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

const cnicValidation = z.number();
// .min(13, { message: ERRORS.CNIC_REQUIRED })
// // .regex(nameRegex, {
// //   message: ERRORS.CNIC_INVALID,
// // })
// .max(13, { message: LENGTH.MAX_13 });

const mobileValidation = z.number();
// .min(11, { message: ERRORS.MOBILE_REQUIRED })
// // .regex(nameRegex, {
// //   message: ERRORS.MOBILE_INVALID,
// // })
// .max(11, { message: LENGTH.MAX_11 });

const addressValidation = z
  .string()
  .min(0, { message: ERRORS.ADDRESS_REQUIRED })
  .max(100, { message: LENGTH.MAX_100 });

export {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  cnicValidation,
  mobileValidation,
  addressValidation,
};
