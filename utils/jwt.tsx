import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { jwtKeys, jwtOptions } from "../config";

const { private_key, public_key } = jwtKeys as {
  private_key: string;
  public_key: string;
};

const accessTokenOptions: SignOptions = {
  issuer: jwtOptions.issuer,
  algorithm: jwtOptions.algorithm as jwt.Algorithm,
  expiresIn: jwtOptions.accessTokenExpiresIn,
};

const refreshTokenOptions: SignOptions = {
  issuer: jwtOptions.issuer,
  algorithm: jwtOptions.algorithm as jwt.Algorithm,
};

interface Payload {
  [key: string]: any;
}

const signAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, private_key, accessTokenOptions);
};

const verifyAccessToken = (token: string): JwtPayload | string | false => {
  try {
    return jwt.verify(token, public_key, accessTokenOptions);
  } catch (err) {
    return false;
  }
};

const signRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, private_key, refreshTokenOptions);
};

const verifyRefreshToken = (token: string): JwtPayload | string | false => {
  try {
    return jwt.verify(token, public_key, refreshTokenOptions);
  } catch (err) {
    return false;
  }
};

const decode = (token: string): null | { [key: string]: any } | string => {
  return jwt.decode(token, { complete: true }) as
    | { [key: string]: any }
    | string
    | null;
};

export {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  decode,
};
