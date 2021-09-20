const Utility = require("../utility");

class Wallet {
  constructor() {
    this.id = Utility.id();
    this.publicKey = Utility.publicKey();
    this.keyPair = Utility.keyPair();
    this.balance = 0;
  }
  toString() {
    return `id: ${this.id} \n publicKey: ${this.publicKey} \n balance: ${this.balance} \n
    ${this.keyPair}`;
  }
}

module.exports = Wallet;
