

const { utils } = require('elliptic');
const { json } = require('express');
const Utility = require('./index');

Utility.publicKey();
const  signature= Utility.sign('Mehdi');
console.log(JSON.stringify(Utility.keyPair()));