export interface Movimentacao {
  id: number;
  date: string;
  description: string | null;
  account: string | null;
  value: number;
  status: 'PAGO' | 'PENDENTE' | 'CANCELADO' | 'RECEBIDO';
  tipo: 'ENTRADA' | 'SAIDA';
  entradaId: number | null;
  despesaId: number | null;
  entrada: Entrada | null;
  despesa: Despesa | null;
}

export interface Entrada {
  id: number;
  data: string;
  total: number;
}

export interface Despesa {
  id: number;
  date: string;
  description: string | null;
  account: string | null;
  category: string;
  value: number;
  status: 'PAGO' | 'PENDENTE';
}
