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
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  salt: z.string().optional(),
  password: z.string().optional(),
  refreshToken: z.string().optional().default(""),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

interface IUser {
  id?: string | Types.ObjectId | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  salt?: string;
  password?: string;
  refreshToken?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class User {
  id: string | Types.ObjectId | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  #password?: string | undefined;
  #salt?: string | undefined;
  refreshToken: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(possibleUser: IUser) {
    const parsed = UserSchema.parse(possibleUser);
    this.id = parsed.id;
    this.firstName = parsed.firstName;
    this.lastName = parsed.lastName;
    this.email = parsed.email;
    this.#password = parsed.password;
    this.#salt = parsed.salt;
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
      role: UserConstants.USER,
    });
  }

  toUserInfo() {
    return encryptData({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
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
