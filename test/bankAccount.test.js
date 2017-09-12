const BankAccount = require('../domain/BankAccount')
const Transaction = require('../domain/Transaction')

describe('BankAccount', () => {
  const amount = 10
  const aDate = new Date(2014, 2, 3)

  const transactionRepository = { put: jest.fn(), all: jest.fn() }
  const statementPrinter = { print: jest.fn() }
  const clock = { now: () => aDate }
  const account = new BankAccount(clock, statementPrinter, transactionRepository)

  it('deposits an amount', () => {
    account.deposit(amount)

    expect(transactionRepository.put).toHaveBeenCalledWith(new Transaction(amount, aDate))
  })

  it('withdraws an amount', () => {
    account.withdraw(amount)

    expect(transactionRepository.put).toHaveBeenCalledWith(new Transaction(-amount, aDate))
  })

  it('prints the statement', () => {
    const transactions = [
      new Transaction(100, new Date(2014, 4, 5)),
      new Transaction(-20, new Date(2014, 6, 7))
    ]
    transactionRepository.all.mockReturnValueOnce(transactions)

    account.printStatement()

    expect(statementPrinter.print).toHaveBeenCalledWith(transactions)
  })
})
