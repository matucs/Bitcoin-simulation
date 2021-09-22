const UUID = require("uuid");
const SHA256 = require("sha256");
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

class Utility {
  constructor() {}
  static id() {
    return UUID.v1();
  }
  static SHA256(message) {
    return SHA256(message);
  }
  static keyPair() {
    return ec.genKeyPair();
  }
  static publicKey(keyPair) {
    return keyPair.getPublic().encode("hex");
  }
  static sign(keyPair,message) {
    return keyPair.sign(message);
  }
  static verify(publicKey,signature, data) {
    return ec
      .keyFromPublic(publicKey, "hex")
      .verify(data, signature);
  }
}

module.exports = Utility;
