class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  Add_UpdateTransaction(transaction) {
    const tr = this.transactions.find((tr) => tr.id == transaction.id);
    if (tr) {
      const index = this.transactions.indexOf(tr);
      this.transactions[index] = transaction;
    } else {
      this.transactions.push(transaction);
    }
    return transaction;
  }
}

module.exports = TransactionPool;
