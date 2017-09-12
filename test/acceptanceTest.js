const timeKeeper = require('timekeeper')
const stdout = require('test-console').stdout;

const Printer = require('../infrastructure/Printer')
const Clock = require('../infrastructure/Clock')
const BankAccount = require('../domain/BankAccount')
const TransactionRepository = require('../domain/TransactionRepository')
const StatementPrinter = require('../domain/StatementPrinter')

describe('Acceptance tests', () => {
  const transactionRepository = new TransactionRepository()
  const printer = { print: () => {} }
  let clock = { now: () => {} }
  const statementPrinter = new StatementPrinter(printer)
  const account = new BankAccount(clock, statementPrinter, transactionRepository)
  before( () => {
    sinon.spy(printer, 'print')
  })

  it('prints the statement', () => {
    clock.now = () => new Date(2014,4,1)
    account.deposit(1000)
    clock.now = () => new Date(2014,4,2)
    account.withdraw(100)
    clock.now = () => new Date(2014,4,10)
    account.deposit(500)

    account.printStatement()

    expect(printer.print).inOrder.to.have.been.calledWith('DATE | AMOUNT | BALANCE')
    .subsequently.calledWith('10/04/2014 | 500.00 | 1400.00')
    .subsequently.calledWith('02/04/2014 | -100.00 | 900.00')
    .subsequently.calledWith('01/04/2014 | 1000.00 | 1000.00')
  })
})
