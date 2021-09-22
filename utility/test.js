

const { utils } = require('elliptic');
const { json } = require('express');
const Utility = require('./index');

const keyPair = Utility.keyPair();
const pub = Utility.publicKey(keyPair);
const  signature= Utility.sign(keyPair,'Mehdi');
const keyPair2 = Utility.keyPair();
const pub2 = Utility.publicKey(keyPair2);
console.log(Utility.verify(pub2 , signature, 'Mehdi'));
//console.log(JSON.stringify(Utility.keyPair()));