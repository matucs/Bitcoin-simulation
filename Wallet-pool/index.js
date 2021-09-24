const Wallet = require("../wallet");

class WalletPool {
  constructor() {
    this.wallets = [];
  }
  Add() {
    const wallet = new Wallet();
    this.wallets.push(wallet);
    return wallet;
  }
  Get(publicKey) {
    const w = this.wallets.find((r) => r.publicKey == publicKey);
    if (w) {
      return this.wallets.find((r) => r.publicKey == publicKey);
    } else {
      return null;
    }
  }
}

module.exports = WalletPool;
