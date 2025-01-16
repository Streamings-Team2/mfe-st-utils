import { AES, enc } from "crypto-js";

const CRYPTO_KEY: string = process.env.CRYPTO_KEY || "";

export const encrypt = (data: string): string => {
  return AES.encrypt(data, CRYPTO_KEY).toString();
};

export const decrypt = <T>(data: string): T | null => {
  const decryptedValue = AES.decrypt(data, CRYPTO_KEY).toString(enc.Utf8);
  return JSON.parse(decryptedValue) as T;
};

const cryptoFunctions = {
  encrypt,
  decrypt,
};

export default cryptoFunctions;
