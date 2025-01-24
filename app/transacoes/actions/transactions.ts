'use server'

import { Transaction, TransactionSummary, TransactionStatus } from '../types/transaction'

export async function getTransactions(): Promise<{
  transactions: Transaction[]
  summary: TransactionSummary
}> {
  // TODO: Replace with your actual API call
  const data = {
    transactions: [
      {
        id: '1',
        date: '02/01/2025',
        details: '',
        account: 'dinheiro',
        inputValue: 175.12,
        outputValue: 70.0,
        status: TransactionStatus.PAGO,
      },
      // Add more mock data as needed
    ],
    summary: {
      totalInput: 9932.02,
      totalOutput: 10511.80,
      accountsPayable: 0,
      accountsReceivable: 0,
    },
  }

  return data
}

