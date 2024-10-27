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

const cnicValidation = z
  .string()
  .min(13, { message: ERRORS.CNIC_REQUIRED })
  .max(13, { message: LENGTH.MAX_13 });
// .min(13, { message: ERRORS.CNIC_REQUIRED })
// // .regex(nameRegex, {
// //   message: ERRORS.CNIC_INVALID,
// // })
// .max(13, { message: LENGTH.MAX_13 });

const mobileValidation = z
  .string()
  .min(7, { message: ERRORS.MOBILE_REQUIRED })
  .max(13, { message: LENGTH.MAX_13 });
// .min(11, { message: ERRORS.MOBILE_REQUIRED })
// // .regex(nameRegex, {
// //   message: ERRORS.MOBILE_INVALID,
// // })
// .max(11, { message: LENGTH.MAX_11 });

const addressValidation = z
  .string()
  .min(0, { message: ERRORS.ADDRESS_REQUIRED })
  .max(100, { message: LENGTH.MAX_100 });

const userIdValidation = z.string().min(1, { message: ERRORS.USER_REQUIRED });
const dealIdValidation = z.string().min(1, { message: ERRORS.DEAL_REQUIRED });
const nameValidation = z
  .string()
  .min(1, { message: ERRORS.NAME_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.NAME_INVALID,
  })
  .max(30, { message: LENGTH.MAX_30 });
const dealNameValidation = z
  .string()
  .min(1, { message: ERRORS.NAME_REQUIRED })
  .max(100, { message: LENGTH.MAX_100 });

const descriptionValidation = z
  .string()
  .min(1, { message: ERRORS.DESCRIPTION_REQUIRED })
  .regex(nameRegex, {
    message: ERRORS.DESCRIPTION_REQUIRED,
  })
  .max(30, { message: LENGTH.MAX_30 });

const worthValidation = z
  .number()
  .min(1, { message: ERRORS.WORTH_REQUIRED })
  .max(10000000, { message: ERRORS.WORTH_BETWEEN_1_10000000 });

const advanceValidation = z
  .number()
  .min(1, { message: ERRORS.ADVANCE_REQUIRED });

const noOfInstallmentsValidation = z
  .number()
  .min(1, { message: ERRORS.NO_OF_INSTALLMENTS_REQUIRED });

const referenceOneValidation = z
  .string()
  .min(1, { message: ERRORS.REFERENCE_REQUIRED });

const referenceTwoValidation = z
  .string()
  .min(1, { message: ERRORS.REFERENCE_REQUIRED });

const amountValidation = z
  .number()
  .min(1, { message: ERRORS.AMOUNT_REQUIRED })
  .max(10000000, { message: ERRORS.AMOUNT_BETWEEN_1_10000000 });

export {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  cnicValidation,
  mobileValidation,
  addressValidation,
  userIdValidation,
  nameValidation,
  descriptionValidation,
  worthValidation,
  advanceValidation,
  noOfInstallmentsValidation,
  referenceOneValidation,
  referenceTwoValidation,
  dealIdValidation,
  amountValidation,
  dealNameValidation,
};
