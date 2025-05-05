"use server";
import CryptoJS from "crypto-js";
import { securitykey } from "../config";

const encryptData = (data: any): string => {
  try {
    if (!data) return "";
    const jsonData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(
      jsonData,
      securitykey || ""
    ).toString();
    return encrypted;
  } catch (err) {
    return "";
  }
};

const decryptData = (data: string): any => {
  try {
    if (!data) return "";
    const decrypted = CryptoJS.AES.decrypt(data, securitykey || "").toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  } catch (err) {
    console.log("err in decryptData>>>", err);
    return "";
  }
};

export { encryptData, decryptData };
