const Block = require("../Block");
const { DIFFICULTY } = require("../config");
const Utility = require("../utility");
const Wallet = require("../wallet");

class Miner {
  constructor() {
    this.wallet = new Wallet();
  }
  static proofOfWork(lastBlock, data) {
    let nonce = 0;
    let timestamp;
    let difficulty = DIFFICULTY;
    let hash;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.calculateDifficulty(difficulty, lastBlock, timestamp);
      hash = Utility.SHA256(`${timestamp} ${difficulty} ${data} ${nonce}`);
      console.log(hash);
      console.log(nonce);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return nonce;
  }
}

module.exports = Miner;
