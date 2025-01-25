'use client';

import { useEffect, useState } from 'react';
import { Summary } from './components/summary';
import { TransactionsTable } from './components/transactions-table';
import { Transaction, TransactionSummary, TransactionStatus } from './types/transaction';
import { API_BASE_URL } from '@/lib/config';

interface Movimentacao {
  id: number;
  date: string;
  description: string | null;
  account: string | null;
  tipo: 'ENTRADA' | 'SAIDA';
  value: number;
  status: 'PENDENTE' | 'RECEBIDO';
}

async function fetchTransactions(): Promise<{ transactions: Transaction[]; summary: TransactionSummary }> {
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
    status: t.status as TransactionStatus, // Casting explícito para TransactionStatus
  }));

  return { transactions, summary };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { transactions, summary } = await fetchTransactions();
        setTransactions(transactions);
        setSummary(summary);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro ao carregar os dados');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {summary && <Summary data={summary} />}
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}
