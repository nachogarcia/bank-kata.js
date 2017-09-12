const TransactionRepository = require('../domain/TransactionRepository')
const Transaction = require('../domain/Transaction')

describe('TransactionRepository', () => {
  it('retrieves all put items', () => {
    const transactions = [
      new Transaction(10, '01/02/03'),
      new Transaction(-5, '04/05/06')
    ]
    const transactionRepository = new TransactionRepository()

    transactionRepository.put(transactions[0])
    transactionRepository.put(transactions[1])

    expect(transactionRepository.all()).toEqual(transactions)
  })
})
