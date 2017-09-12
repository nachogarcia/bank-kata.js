const BankAccount = require('../domain/BankAccount')
const TransactionRepository = require('../domain/TransactionRepository')
const StatementPrinter = require('../domain/StatementPrinter')

describe('Acceptance tests', () => {
  const printer = { print: jest.fn() }
  const clock = { now: jest.fn() }
  const transactionRepository = new TransactionRepository()
  const statementPrinter = new StatementPrinter(printer)
  const account = new BankAccount(clock, statementPrinter, transactionRepository)

  it('prints the statement', () => {
    clock.now.mockReturnValueOnce(new Date(2014, 4, 1))
    clock.now.mockReturnValueOnce(new Date(2014, 4, 2))
    clock.now.mockReturnValueOnce(new Date(2014, 4, 10))
    account.deposit(1000)
    account.withdraw(100)
    account.deposit(500)

    account.printStatement()

    expect(printer.print.mock.calls).toEqual([
      ['DATE | AMOUNT | BALANCE'],
      ['10/04/2014 | 500.00 | 1400.00'],
      ['02/04/2014 | -100.00 | 900.00'],
      ['01/04/2014 | 1000.00 | 1000.00']
    ])
  })
})
