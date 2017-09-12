const StatementPrinter = require('../domain/StatementPrinter')
const Transaction = require('../domain/Transaction')

describe('StatementPrinter', () => {
  const printer = { print: jest.fn() }
  const statementPrinter = new StatementPrinter(printer)

  it('prints the statement', () => {
    const transactions = [
      new Transaction(1000, new Date(2014, 4, 1)),
      new Transaction(-100, new Date(2014, 4, 2)),
      new Transaction(500, new Date(2014, 4, 10))
    ]

    statementPrinter.print(transactions)

    expect(printer.print.mock.calls).toEqual([
      ['DATE | AMOUNT | BALANCE'],
      ['10/04/2014 | 500.00 | 1400.00'],
      ['02/04/2014 | -100.00 | 900.00'],
      ['01/04/2014 | 1000.00 | 1000.00']
    ])
  })
})
