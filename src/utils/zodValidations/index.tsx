import * as z from "zod";
import { ERRORS, GENERIC } from "../constants";
import {
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
  referenceOneValidation,
  referenceTwoValidation,
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

export const createUserSchema = z.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  mobile: mobileValidation,
  cnic: cnicValidation,
  address: addressValidation,
});

export const createDealSchema = z
  .object({
    userId: userIdValidation,
    name: nameValidation,
    description: descriptionValidation,
    worth: worthValidation,
    advance: advanceValidation,
    referenceOne: referenceOneValidation,
    referenceTwo: referenceTwoValidation,
  })
  .superRefine((value, ctx) => {
    if (Number(value.advance) > Number(value.worth)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.ADVANCE_GREATER_REQUIRED,
        path: [GENERIC.ADVANCE],
      });
    }
  });

export { loginSchema };
