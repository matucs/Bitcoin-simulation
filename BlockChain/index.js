const Block = require("../Block");
const { DIFFICULTY } = require("../config");
const Miner = require("../Miner");
const Transaction = require("../Transaction");
const rp = require("request-promise");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
    this.url = process.argv[2];
    this.NodesUrl = [];
  }
  mine(miner, transactionPool) {
    const lastBlock = this.chain[this.chain.length - 1];
    const nonce = Miner.proofOfWork(
      lastBlock,
      transactionPool.VerifiedTransaction()
    );
    const index = this.chain.length + 1;
    const hash = Block.hash(
      lastBlock.hash,
      transactionPool.VerifiedTransaction(),
      nonce
    );
    const newBlock = new Block(
      index,
      lastBlock.hash,
      hash,
      transactionPool.VerifiedTransaction(),
      nonce,
      DIFFICULTY
    );
    transactionPool.Clear();
    this.chain.push(newBlock);
    this.sendClear();
    const tr = transactionPool.Add_UpdateTransaction(
      new Transaction("00", miner.wallet.publicKey, 12.5)
    );
    this.sendTransaction(tr);
    this.sendBlock(newBlock);
  }
  add_new_Node(newUrl) {
    if (this.NodesUrl.length > 0) {
      const promises = [];
      this.NodesUrl.forEach((url) => {
        const opt = {
          uri: url + "/add-new-node",
          method: "POST",
          body: { url: newUrl },
          json: true,
        };
        promises.push(rp(opt));
      });
      Promise.all(promises).then((res) => {});
    }
    const nodeUrls = [...this.NodesUrl];
    nodeUrls.push(this.url);
    const opt = {
      uri: newUrl + "/add-nodes-url",
      method: "POST",
      body: { nodeUrls: nodeUrls },
      json: true,
    };
    rp(opt).then((r) => {
      this.NodesUrl.push(newUrl);
    });
  }
  isValidChain(blockchain) {
    for (var i = 1; i < blockchain.chain.length; i++) {
      const previousblock = blockchain.chain[i - 1];
      const block = blockchain.chain[i];
      if (
        previousblock.hash != block.previousBlockHash ||
        block.hash !=
          Block.hash(block.previousBlockHash, block.data, block.nonce)
      ) {
        return false;
      }

      if (
        blockchain.chain[0].hash !== "0" ||
        blockchain.chain[0].previousBlockHash !== "0" ||
        blockchain.chain[0].data.length !== 0
      )
        return false;
    }
    return true;
  }
  Consensus() {
    const promises = [];
    this.NodesUrl.forEach((url) => {
      promises.push(rp(url + "/blockchain"));
    });
    Promise.all(promises).then((blockchains) => {
      let maxLength = this.chain.length;
      let MaxChain = [...this.chain];
      blockchains.forEach((blockchain) => {
        const bc = JSON.parse(blockchain);
        if (bc.chain && bc.chain.length > maxLength && this.isValidChain(bc)) {
          maxLength = bc.chain.length;
          MaxChain = [...bc.chain];
        }
      });
      this.chain = [...MaxChain];
    });
  }
  sendBlock(newBlock) {
    this.NodesUrl.forEach((url) => {
      const opt = {
        uri: url + "/add/block",
        method: "POST",
        body: { block: newBlock },
        json: true,
      };
      rp(opt).then((res) => {});
    });
  }
  sendTransaction(transaction) {
    this.NodesUrl.forEach((url) => {
      const opt = {
        uri: url + "/transaction-broadcast",
        method: "POST",
        body: { transaction: transaction },
        json: true,
      };
      rp(opt).then((res) => {});
    });
  }

  sendClear() {
    this.NodesUrl.forEach((url) => {
      rp(url + "/clear").then((res) => {});
    });
  }
}

module.exports = BlockChain;
