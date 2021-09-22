

const Transaction = require('./index');
const Wallet = require('../wallet/index');
const Utility = require('../utility');

const w1 = new Wallet();
const w2 = new Wallet();

const tr = new Transaction(w1.publicKey,w2.publicKey, 23);
tr.sign();
//tr.amount = 40;
console.log(tr.verify());