const BankAccount = require('../domain/BankAccount')
const Transaction = require('../domain/Transaction')

describe('BankAccount', () => {
  const amount = 10
  const aDate = new Date(2014,2,3)

  let transactionRepository,
    clock,
    account,
    statementPrinter

  beforeEach(() => {
    transactionRepository = { put: () => {} }
    sinon.spy(transactionRepository, 'put')

    statementPrinter = { print: () => {} }
    sinon.spy(statementPrinter, 'print')

    clock = { now: () => aDate }

    account = new BankAccount(clock, statementPrinter, transactionRepository)
  })

  it('deposits an amount', () => {
    account.deposit(amount)

    expect(transactionRepository.put).to.have.been.calledWith(new Transaction(amount, aDate))
  })

  it('withdraws an amount', () => {
    account.withdraw(amount)

    expect(transactionRepository.put).to.have.been.calledWith(new Transaction(-amount, aDate))
  })

  it('prints the statement', () => {
    const transactions = [ new Transaction(100, new Date(2014,4,5)), new Transaction(-20, new Date(2014,6,7))]
    transactionRepository.all = () => transactions

    account.printStatement()

    expect(statementPrinter.print).to.have.been.calledWith(transactions)
  })
})
