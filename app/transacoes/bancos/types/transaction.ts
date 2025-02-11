export enum AccountType {
    BANRISUL = "Banrisul",
    STONE = "Stone",
    IFOOD = "iFood",
    CRESSOL = "Cressol",
    CAIXA_FISICO = "Dinheiro",
  }
  
  export interface Transaction {
    id: string
    date: string
    account: AccountType
    description: string
    amount: number
  }
  
  