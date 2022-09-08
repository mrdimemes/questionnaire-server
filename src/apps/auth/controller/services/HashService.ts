import crypto from "crypto";

class HashService {
  getHash(plainText: string) {
    return crypto.createHmac("sha256", "" + process.env.SALT)
      .update(plainText).digest("base64");
  }

  checkHash(plainText: string, hash: string) {
    return this.getHash(plainText) === hash;
  }
}

export default new HashService();