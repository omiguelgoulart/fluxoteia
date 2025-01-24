import { Movimentacao } from '../types/movimentacao';
import { Transaction, TransactionStatus, TransactionSummary } from '../types/transaction';
import { API_BASE_URL } from '@/lib/config';

export async function getTransactions(): Promise<{ transactions: Transaction[]; summary: TransactionSummary }> {
  const res = await fetch(`${API_BASE_URL}/movimentacao`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Erro ao carregar movimentações');
  }

  const data: Movimentacao[] = await res.json();

  const summary: TransactionSummary = {
    totalInput: data.filter((t) => t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.value, 0),
    totalOutput: data.filter((t) => t.tipo === 'SAIDA').reduce((sum, t) => sum + t.value, 0),
    accountsPayable: data.filter((t) => t.status === 'PENDENTE' && t.tipo === 'SAIDA').reduce((sum, t) => sum + t.value, 0),
    accountsReceivable: data.filter((t) => t.status === 'PENDENTE' && t.tipo === 'ENTRADA').reduce((sum, t) => sum + t.value, 0),
  };

  const transactions: Transaction[] = data.map((t) => ({
    id: String(t.id),
    date: t.date,
    details: t.description || 'Sem descrição',
    account: t.account || 'Não especificado',
    inputValue: t.tipo === 'ENTRADA' ? t.value : null,
    outputValue: t.tipo === 'SAIDA' ? t.value : null,
    status: t.status as TransactionStatus, // Casting explícito
  }));
  

  return { transactions, summary };
}
