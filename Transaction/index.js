const Utitlity = require("../utility/index");

class Transaction {
  constructor(from, to, amount) {
    this.id = Utitlity.id();
    this.timestamp = Date.now();
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.data = `${this.from} ${this.to} ${this.amount}`;
  }

  toString() {
    return `time: ${this.timestamp} \n from:${this.from} \n ${this.to} \n amount: ${this.amount}`;
  }
  sing() {
    const hash = Utitlity.SHA256(this.data);
    this.signature = Utitlity.sign(hash);
    return this.signature;
  }
  verify() {
    const hash = Utitlity.SHA256(`${this.from} ${this.to} ${this.amount}`);
    return Utitlity.verify(this.signature, hash);
  }
}
module.exports = Transaction;
