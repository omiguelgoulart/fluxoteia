'use client';

import { useState, useEffect } from 'react';
import AddExpenseModal from './AddExpenseModal';
import ExpensesTable from './ExpensesTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { API_BASE_URL } from '@/lib/config';
import { Expense } from './types';


export default function DailyExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]); // Certifique-se de que `Expense` esteja definido corretamente
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/despesas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error('Erro ao buscar despesas');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/despesas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses((prev) => [...prev, newExpense]);
      } else {
        console.error('Erro ao adicionar despesa');
      }
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  const handleQrCodeScanned = async (qrCodeData: string) => {
    try {
      const response = await fetch(`/api/buscar-dados?url=${encodeURIComponent(qrCodeData)}`);
      const data = await response.json();

      if (response.ok) {
        const newExpense: Omit<Expense, 'id'> = {
          date: data.data || new Date().toISOString().split('T')[0],
          number: data.number || '',
          description: data.nome || '',
          account: '',
          category: '',
          subcategory: '',
          value: parseFloat(data.valor) || 0,
          status: 'PENDENTE' as Expense['status'],
        };
        addExpense(newExpense);
      } else {
        alert('Erro ao buscar os dados do QR Code.');
      }
    } catch (error) {
      console.error('Erro ao processar o QR Code:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const onUpdateExpense = async (id: string, updatedData: Partial<Expense>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        setExpenses((prev) =>
          prev.map((expense) => (expense.id === id ? updatedExpense : expense))
        );
      } else {
        console.error('Erro ao atualizar despesa');
      }
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
    }
  };

  const onDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      } else {
        console.error('Erro ao deletar despesa');
      }
    } catch (error) {
      console.error('Erro ao deletar despesa:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Entradas do Dia</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end"></div>
          <AddExpenseModal 
  onAddExpense={addExpense} 
  onQrCodeScanned={handleQrCodeScanned} 
/>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Carregando despesas...</div>
        ) : (
          <ExpensesTable expenses={expenses} onUpdateExpense={onUpdateExpense} onDeleteExpense={onDeleteExpense} loading={loading} />

        )}
      </CardContent>
    </Card>
  );
}
