class StatementPrinter {
  constructor (printer) {
    this.printer = printer
  }

  print (transactions) {
    const header = 'DATE | AMOUNT | BALANCE'

    const lines = [ header ].concat(transactionsToLines(transactions))

    lines.forEach(line => this.printer.print(line))

    function transactionsToLines (transactions) {
      const fixNumber = (n) => n.toFixed(2)
      const padNumber = (n) => n.toString().padStart(2, '0')
      const format = (date) => `${padNumber(date.getDate())}/${padNumber(date.getMonth())}/${date.getFullYear()}`
      let balance = 0

      return transactions.map(transaction => {
        balance += transaction.amount
        return `${format(transaction.date)} | ${fixNumber(transaction.amount)} | ${fixNumber(balance)}`
      }).reverse()
    }
  }
}

module.exports = StatementPrinter
