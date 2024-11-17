import * as z from "zod";
import { ERRORS, GENERIC, NAMES } from "../constants";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  cnicValidation,
  mobileValidation,
  addressValidation,
  userIdValidation,
  descriptionValidation,
  worthValidation,
  advanceValidation,
  noOfInstallmentsValidation,
  referenceOneValidation,
  referenceTwoValidation,
  dealIdValidation,
  amountValidation,
  dealNameValidation,
  dateValidation,
  paymentMethode,
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
    name: dealNameValidation,
    description: descriptionValidation,
    worth: worthValidation,
    advance: advanceValidation,
    noOfInstallments: noOfInstallmentsValidation,
    referenceOne: referenceOneValidation,
    referenceTwo: referenceTwoValidation,
    date: dateValidation,
    paymentMethode: paymentMethode,
  })
  .superRefine((value, ctx) => {
    if (Number(value.advance) > Number(value.worth)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.ADVANCE_GREATER_REQUIRED,
        path: [GENERIC.ADVANCE],
      });
    }
    if (value.userId === value.referenceOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.CUSTOMER_NOT_REFERENCE_HIMSELF,
        path: [NAMES.REFERENCE_ONE],
      });
    }
    if (value.userId === value.referenceTwo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERRORS.CUSTOMER_NOT_REFERENCE_HIMSELF,
        path: [NAMES.REFERENCE_TWO],
      });
    }
  });

export const createInstallmentSchema = z.object({
  userId: userIdValidation,
  dealId: dealIdValidation,
  amount: amountValidation,
  date: dateValidation,
  paymentMethode: paymentMethode,
});

export { loginSchema };
