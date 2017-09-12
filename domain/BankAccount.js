const Transaction = require('./Transaction')

class BankAccount {
  constructor (clock, statementPrinter, transactionRepository) {
    this.clock = clock
    this.statementPrinter = statementPrinter
    this.transactionRepository = transactionRepository
  }

  deposit (amount) {
    this.transactionRepository.put(new Transaction(amount, this.clock.now()))
  }

  withdraw (amount) {
    this.transactionRepository.put(new Transaction(-amount, this.clock.now()))
  }

  printStatement () {
    this.statementPrinter.print(this.transactionRepository.all())
  }
}

module.exports = BankAccount
