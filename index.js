const express = require("express");
const port = 3000;
const app = express();
const Wallet = require("./wallet/index");
const wallets = [];


app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/wallets", (req, res) => {
  res.send(wallets);
});

app.get("/add/wallet", (req, res) => {
  const w1 = new Wallet();
  wallets.push(w1);
  res.send(w1);
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
