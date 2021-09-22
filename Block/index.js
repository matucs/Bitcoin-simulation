const { DIFFICULTY, MINING_RATE } = require("../config");
const Utility = require("../utility");

class Block {
  constructor(index, previousBlockHash, hash, data, nonce, difficulty) {
    this.index = index;
    this.timestamp = Date.now();
    this.previousBlockHash = previousBlockHash;
    this.hash = hash;
    this.nonce = nonce;
    this.data = data;
    this.difficulty = difficulty;
  }
  toString() {
    return ` ${this.previousBlockHash} \n ${this.hash} `;
  }

  static genesis() {
    return new this(1, "0", "0", [], 0, DIFFICULTY);
  }
  static hash(previousHash, data, nonce) {
    return Utility.SHA256(`${previousHash} ${JSON.stringify(data)} ${nonce}`);
  }
  static calculateDifficulty(difficulty, lastBlock, timestamp) {
    if (lastBlock.timestamp + MINING_RATE > timestamp) {
      //difficulty++;
    }
    return difficulty;
  }
}

module.exports = Block;
