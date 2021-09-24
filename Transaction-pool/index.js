class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  Add_UpdateTransaction(transaction) {
    const tr = this.transactions.find((tr) => tr.id == transaction.id);
    if (tr) {
      const index = this.transactions.indexOf(tr);
      transaction.sign();
      this.transactions[index] = transaction;
    } else {
      transaction.sign();
      this.transactions.push(transaction);
    }
    return transaction;
  }
  VerifiedTransaction() {
    return this.transactions.filter((tr) => tr.verify());
  }
  Clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
