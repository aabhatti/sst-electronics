import cryptoJS from "crypto-js";
const Securitykey = process.env.REACT_APP_ENCRYPTER;

const setLocalStorageItem = (key, data) => {
  try {
    const encrypted = cryptoJS.AES.encrypt(
      JSON.stringify(data || ""),
      Securitykey
    ).toString();
    localStorage.setItem(key, encrypted);
  } catch (e) {
    console.log("err in setLocalStorageItem>", e);

    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      // Handle the quota exceeded error here.
      // This could involve clearing old data or showing a user-friendly message.
    } else {
      // Handle other localStorage-related errors.
    }
    clearLocalStorageItems();
    window.location = "/";
  }
};
const getLocalStorageItem = (key) => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    const decrypted = cryptoJS.AES.decrypt(encrypted, Securitykey).toString(
      cryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  } catch (err) {
    console.log("err in getLocalStorageItem>", err);
    clearLocalStorageItems();
    window.location = "/";
  }
};

const getLocalStorageItemExect = (key) => {
  return localStorage.getItem(key);
};

const clearLocalStorageItems = async () => {
  return await localStorage.clear();
};

export {
  setLocalStorageItem,
  getLocalStorageItem,
  getLocalStorageItemExect,
  clearLocalStorageItems,
};
