import * as z from "zod";
import moment from "moment";
import crypto from "crypto";
import mongoose, { Types } from "mongoose";
import { dbId } from "../../utils";
import * as JWT from "../../utils/jwt";
import {
  UserConstants,
  GenericMessages,
  GENERIC_CONSTANTS,
} from "../../constants";
import { encryptData } from "../../utils/encryptDecrypt";
import { BadRequest, Unauthorized } from "../../errors";

const ObjectId = mongoose.Types.ObjectId;

const UserSchema = z.object({
  id: dbId.optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional().default(""),
  email: z.string().email(),
  role: z.string().default("user"),
  cnic: z.string().optional().default(""),
  mobile: z.string().optional(),
  address: z.string().optional(),
  emailToken: z.string().optional(),
  salt: z.string().optional(),
  password: z.string().optional(),
  status: z.string().optional(),
  refreshToken: z.string().optional(),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

interface IUser {
  id?: string | Types.ObjectId | null | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  name: string;
  email: string;
  role: string;
  cnic?: string | undefined;
  mobile?: string | undefined;
  address?: string | undefined;
  emailToken?: string | undefined;
  salt?: string;
  password?: string;
  status?: string | undefined;
  refreshToken?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class User {
  id: string | Types.ObjectId | null | undefined;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  role: string;
  cnic?: string;
  mobile?: string;
  address?: string;
  emailToken?: string;
  #password?: string | undefined;
  #salt?: string | undefined;
  status?: string | undefined;
  refreshToken?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(possibleUser: IUser) {
    const parsed = UserSchema.parse(possibleUser);
    this.id = parsed.id;
    this.firstName = parsed.firstName;
    this.lastName = parsed.lastName;
    this.name = parsed.name;
    this.email = parsed.email;
    this.role = parsed.role;
    this.cnic = parsed.cnic || "";
    this.mobile = parsed.mobile;
    this.address = parsed.address;
    this.emailToken = parsed.emailToken;
    this.#password = parsed.password;
    this.#salt = parsed.salt;
    this.status = parsed.status;
    this.refreshToken = parsed.refreshToken;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }

  generateTokens({
    expiredAt = "",
  }: {
    expiredAt?: string | number | undefined;
  }) {
    if (!expiredAt) {
      expiredAt = moment().add(24, "hours").valueOf();
    }

    return {
      token: encryptData(
        JWT.signAccessToken({
          id: this.id,
        })
      ),
      refreshToken: encryptData(
        JWT.signRefreshToken({
          id: this.id,
          expiredAt,
        })
      ),
    };
  }

  toAuthJSON() {
    return encryptData({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
      role: this.role,
    });
  }

  toUserInfo() {
    return encryptData({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
      role: this.role,
    });
  }

  toLoginKey(password: string) {
    return encryptData({
      id: this.id,
      email: this.email,
      password,
      role: this.role,
    });
  }

  toProfile() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
      role: this.role,
    };
  }

  toUser() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
      cnic: this.cnic,
      mobile: this.mobile,
      address: this.address,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setPassword(password: string) {
    if (!password) throw new BadRequest(GenericMessages.NO_PASSWORD);
    this.#salt = crypto.randomBytes(16).toString("hex");
    this.#password = crypto
      .pbkdf2Sync(
        password,
        this.#salt,
        10000,
        512,
        GENERIC_CONSTANTS.HASH_DIGEST
      )
      .toString("hex");
  }

  validatePassword(password: string) {
    if (!password) throw new BadRequest(GenericMessages.NO_PASSWORD);
    const hash = crypto
      .pbkdf2Sync(
        password,
        this.#salt || "",
        10000,
        512,
        GENERIC_CONSTANTS.HASH_DIGEST
      )
      .toString("hex");
    return this.#password === hash;
  }

  toSerialized() {
    return { salt: this.#salt, password: this.#password, ...this };
  }
}

export { User, type IUser };
