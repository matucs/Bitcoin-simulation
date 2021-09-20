

const Transaction = require('./index');
const Wallet = require('../wallet/index');

const w1 = new Wallet();
const w2 = new Wallet();

const tr = new Transaction(w1,w2, 23);
tr.sing();
//tr.amount = 40;
console.log(tr.verify());