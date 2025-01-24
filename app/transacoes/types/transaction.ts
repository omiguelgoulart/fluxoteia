
export enum TransactionStatus {

  PAGO = 'PAGO',

  PENDENTE = 'PENDENTE',

  CANCELADO = 'CANCELADO',

  RECEBIDO = 'RECEBIDO'

}


export interface Transaction {
  id: string
  date: string
  details: string
  account: string
  inputValue: number | null
  outputValue: number | null
  status: TransactionStatus
}

export interface TransactionSummary {
  totalInput: number
  totalOutput: number
  accountsPayable: number
  accountsReceivable: number
}

