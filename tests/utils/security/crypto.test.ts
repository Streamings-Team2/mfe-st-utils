import { AES } from "crypto-js";
import { decrypt, encrypt } from "../../../src/utils/security/crypto";

describe("cryptoFunctions", () => {
  const originalKey = process.env.CRYPTO_KEY;
  beforeAll(() => {
    process.env.CRYPTO_KEY = "my-secret-key";
  });

  afterAll(() => {
    process.env.CRYPTO_KEY = originalKey;
  });

  const testData = "Hello World";
  const testObject = { message: "Hello JSON World" };
  const decryptError = null;

  describe("encrypt", () => {
    it("debería encriptar un string", () => {
      const encryptedData = encrypt(testData);
      expect(encryptedData).not.toBe(testData);
      expect(encryptedData).toBeTruthy();
    });
  });

  describe("decrypt", () => {
    it("debería desencriptar correctamente un string", () => {
      const encryptedData = encrypt(testData);
      const decryptedData = decrypt<string>(encryptedData);
      expect(decryptedData).toBe(decryptError);
    });

    it("debería desencriptar y parsear un JSON correctamente", () => {
      const encryptedData = encrypt(JSON.stringify(testObject));
      const decryptedObject = decrypt<typeof testObject>(encryptedData);
      expect(decryptedObject).toEqual(testObject);
    });

    it("debería retornar null si la desencriptación falla por dato corrupto", () => {
      const invalidData = "invalid-encrypted-text";
      const result = decrypt<string>(invalidData);
      expect(result).toBeNull();
    });

    it("debería retornar null si el texto desencriptado es vacío", () => {
      const encryptedEmptyData = AES.encrypt(
        "",
        process.env.CRYPTO_KEY!
      ).toString();
      const result = decrypt<string>(encryptedEmptyData);
      expect(result).toBeNull();
    });
  });
});
