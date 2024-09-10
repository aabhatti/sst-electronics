import * as z from "zod";
import moment from "moment";
import crypto from "crypto";
import mongoose, { Types } from "mongoose";
import { dbId } from "../utils";
import * as JWT from "../utils/jwt";
import {
  UserConstants,
  GenericMessages,
  GENERIC_CONSTANTS,
} from "../constants";
import { encryptData } from "../utils/encryptDecrypt";
import { BadRequest, Unauthorized } from "../errors";

const ObjectId = mongoose.Types.ObjectId;

const UserSchema = z.object({
  id: dbId.optional(),
  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),
  name: z.string().optional().default(""),
  email: z.string().email(),
  salt: z.string().optional(),
  password: z.string().optional(),
  status: z.string().optional().default(""),
  refreshToken: z.string().optional().default(""),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

interface IUser {
  id?: string | Types.ObjectId | null | undefined;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  salt?: string;
  password?: string;
  status?: string;
  refreshToken?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class User {
  id: string | Types.ObjectId | null | undefined;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  #password?: string | undefined;
  #salt?: string | undefined;
  status: string;
  refreshToken: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(possibleUser: IUser) {
    const parsed = UserSchema.parse(possibleUser);
    this.id = parsed.id;
    this.firstName = parsed.firstName;
    this.lastName = parsed.lastName;
    this.name = parsed.name;
    this.email = parsed.email;
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
      expiredAt = moment().add(48, "hours").valueOf();
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
      role: UserConstants.USER,
    });
  }

  toUserInfo() {
    return encryptData({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
    });
  }

  toLoginKey(password: string) {
    return encryptData({
      id: this.id,
      email: this.email,
      password,
      role: UserConstants.USER,
    });
  }

  toProfile() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.name,
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
