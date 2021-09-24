const express = require("express");
const port = process.argv[3];
const app = express();
const fs = require("fs");
const Transaction = require("./Transaction/index");
const TransactionPool = require("./Transaction-pool/index");
const BlockChain = require("./BlockChain/index");
const WalletPool = require("./Wallet-pool");
const Miner = require("./Miner");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

const wp = new WalletPool();
const miner = new Miner(wp);
const tp = new TransactionPool();
const Bc = new BlockChain();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
app.get("/Mine", (req, res) => {
  Bc.mine(miner, tp);
  res.json({ Note: "New block has been mined" });
});
app.get("/wallet", (req, res) => {
  let data = fs.readFileSync("./wallet/index.html", "utf8");
  if (data) {
    data.replace("/add/wallet", process.argv[2] + "/add/wallet");
    res.send(data.replace("/wallet-pool", process.argv[2] + "/wallet-pool"));
  }
});
app.get("/connection", (req, res) => {
  let data = fs.readFileSync("./connection/index.html", "utf8");
  if (data) {
    res.send(
      data.replace(
        "/add-new-node-broadcast",
        process.argv[2] + "/add-new-node-broadcast"
      )
    );
  }
});
app.get("/transaction", (req, res) => {
  let data = fs.readFileSync("./transaction/index.html", "utf8");
  if (data) {
    data.replace("/add/transaction", process.argv[2] + "/add/transaction");
    res.send(data.replace("/wallet-pool", process.argv[2] + "/wallet-pool"));
  }
});
app.get("/clear", (req, res) => {
  tp.transactions = [];
  res.send(tp.transactions);
});
app.post("/add/block", (req, res) => {
  const block = req.body.block;
  Bc.chain.push(block);
  res.json({ Note: "New block has been mined" });
});
app.post("/transaction-broadcast", (req, res) => {
  wp.wallets.push(req.body.transaction.from);
  wp.wallets.push(req.body.transaction.to);
  const w1 = wp.Get(req.body.transaction.from.publicKey);
  const w2 = wp.Get(req.body.transaction.to.publicKey);
  const tr = new Transaction(w1, w2, req.body.transaction.amount);
  tp.Add_UpdateTransaction(tr);
  res.send(tp.transactions);
});
app.post("/add-new-node-broadcast", (req, res) => {
  const url = req.body.url;
  Bc.add_new_Node(url);
});
app.post("/add-new-node", (req, res) => {
  const url = req.body.url;
  Bc.NodesUrl.push(url);
});
app.post("/add-nodes-url", (req, res) => {
  const nodeUrls = req.body.nodeUrls;
  Bc.NodesUrl = nodeUrls;
  res.send(Bc.NodesUrl);
});
app.get("/consensus", (req, res) => {
  const result = Bc.Consensus();
  console.log("res:", result);
  res.json({ note: result });
});
app.get("/add/wallet", (req, res) => {
  const w1 = wp.Add();
  res.send(w1);
});
app.get("/wallet-pool", (req, res) => {
  res.send(wp.wallets);
});
app.get("/transaction-pool", (req, res) => {
  res.send(tp.transactions);
});
app.get("/blocks", (req, res) => {
  res.send(Bc);
});
app.get("/blockchain", (req, res) => {
  res.send(Bc);
});
app.post("/add/transaction", (req, res) => {
  const w1 = wp.Get(req.body.from);
  const w2 = wp.Get(req.body.to);
  const tr = new Transaction(w1, w2, req.body.amount);
  tp.Add_UpdateTransaction(tr);
  Bc.sendTransaction(tr);
  res.send(tp.transactions);
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
