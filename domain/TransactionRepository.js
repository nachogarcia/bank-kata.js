class TransactionRepository {
  constructor () {
    this.transactions = []
  }

  put (transaction) {
    this.transactions.push(transaction)
  }

  all () {
    return this.transactions
  }
}

module.exports = TransactionRepository
