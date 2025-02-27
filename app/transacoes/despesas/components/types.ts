export type ExpenseStatus = 'PAGO' | 'PENDENTE';

export interface Expense {
  id: string;
  date: string;
  number: string;
  description: string;
  account: string;
  category: string;
  subcategory: string;
  amount : number;
  status: ExpenseStatus;
}
