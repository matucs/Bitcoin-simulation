const express = require("express");
const port = 3000;
const app = express();
const Wallet = require("./wallet/index");
const Transaction = require("./Transaction/index");
const TransactionPool = require("./Transaction-pool/index");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tp = new TransactionPool();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/wallet", (req, res) => {
  res.sendFile("/wallet/index.html", { root: __dirname });
});
app.get("/transaction", (req, res) => {
  res.sendFile("/transaction/index.html", { root: __dirname });
});

app.get("/add/wallet", (req, res) => {
  const w1 = new Wallet();
  res.send(w1);
});
app.get("/transaction-pool", (req, res) => {
  res.send(tp.transactions);
});
app.post("/add/transaction", (req, res) => {
  const wallets = req.body.wallets.split(",");
  const w1 = wallets.find((w) => w == req.body.from);
  const w2 = wallets.find((w) => w == req.body.to);
  const tr = new Transaction(w1, w2, req.body.amount);
  tp.Add_UpdateTransaction(tr);
  res.send(tp.transactions);
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
