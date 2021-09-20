const Wallet = require("./index");

const w1 = new Wallet();
const w2 = new Wallet();
console.log(JSON.stringify(w2.keyPair));
