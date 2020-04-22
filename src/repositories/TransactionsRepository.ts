import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransactionBTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const reducerIncome = (
      accumulator: number,
      currentTransaction: Transaction
    ): number => {
      if (currentTransaction.type === 'income')
        return accumulator + currentTransaction.value
      return accumulator
    }

    const reducerOutcome = (
      accumulator: number,
      currentTransaction: Transaction
    ): number => {
      if (currentTransaction.type === 'outcome')
        return accumulator + currentTransaction.value
      return accumulator
    }

    const income = this.transactions.reduce(reducerIncome, 0)
    const outcome = this.transactions.reduce(reducerOutcome, 0)

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome
    }

    return balance
  }

  public create({ title, type, value }: CreateTransactionBTO): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
