'use client';

import { useState, useEffect } from 'react';
import AddExpenseModal from './components/AddExpenseModal';
import ExpensesTable from './components/ExpensesTable';
import { API_BASE_URL } from '@/lib/config';
import { Expense } from './components/types';

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
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
      const payload = {
        ...expense,
        date: new Date(expense.date).toISOString(),
        amount: Number(expense.value),
      };

      console.log('Payload enviado ao servidor:', payload);

      const response = await fetch(`${API_BASE_URL}/despesas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao adicionar despesa:', error);
        alert(`Erro: ${error.message || 'Erro desconhecido'}`);
        return;
      }

      const newExpense = await response.json();
      setExpenses((prev) => [...prev, newExpense]);
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao adicionar despesa. Verifique os logs do servidor.');
    }
  };

  const handleQrCodeScanned = async (qrCodeData: string) => {
    try {
      const response = await fetch(`/api/buscar-dados?url=${encodeURIComponent(qrCodeData)}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log('Dados do QR Code:', data);
  
        // Criação de uma nova despesa com os dados extraídos
        const newExpense: Omit<Expense, 'id'> = {
          date: data.data || new Date().toISOString().split('T')[0], // Data de emissão ou data atual
          number: data.number || '', // Número e série concatenados
          description: data.nome || '', // Nome do estabelecimento
          account: '',
          category: '',
          subcategory: '',
          value: parseFloat(data.value) || 0, // value total do cupom fiscal
          status: 'PENDENTE' as Expense['status'], // Converte explicitamente para o tipo ExpenseStatus
        };
  
        addExpense(newExpense); // Adiciona a nova despesa
      } else {
        alert('Erro ao buscar os dados do QR Code.');
      }
    } catch (error) {
      console.error('Erro ao processar o QR Code:', error);
      alert('Erro ao processar o QR Code. Verifique os logs.');
    }
  };
  
  

  const updateExpense = async (id: string, updatedData: Partial<Expense>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setExpenses((prev) =>
          prev.map((expense) => (expense.id === id ? { ...expense, ...updatedData } : expense))
        );
      } else {
        console.error('Erro ao atualizar despesa');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/despesas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      } else {
        console.error('Erro ao deletar despesa');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <AddExpenseModal onAddExpense={addExpense} onQrCodeScanned={handleQrCodeScanned} />
      </div>
      <ExpensesTable
        expenses={expenses}
        onUpdateExpense={updateExpense}
        onDeleteExpense={deleteExpense}
        loading={loading}
      />
    </main>
  );
}
