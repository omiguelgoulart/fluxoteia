'use client';

import { useEffect, useState } from 'react';
import { getTransactions } from './actions/transactions';
import { Summary } from './components/summary';
import { TransactionsTable } from './components/transactions-table';
import { Transaction, TransactionSummary } from './types/transaction';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { transactions, summary } = await getTransactions();
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
