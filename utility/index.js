const UUID = require("uuid");
const SHA256 = require("sha256");
var EC = require("elliptic").ec;
var ec = new EC("secp256k1");

let key;
class Utility {
  constructor() {}
  static id() {
    return UUID.v1();
  }
  static SHA256(message) {
    return SHA256(message);
  }
  static keyPair() {
    return this.key;
  }
  static publicKey() {
    this.key = ec.genKeyPair();
    return this.key.getPublic().encode("hex");
  }
  static sign(message) {
    return this.key.sign(message);
  }
  static verify(signature, data) {
    return ec
      .keyFromPublic(this.key.getPublic(), "hex")
      .verify(data, signature);
  }
}

module.exports = Utility;
