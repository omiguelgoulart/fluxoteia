'use client';

import { useState, useEffect } from 'react';
import { DailyEntries } from './components/DailyEntries';
import { Entry } from './types/finances';
import { API_BASE_URL } from '@/lib/config';

export default function HomePage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/entradas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error('Erro ao buscar entradas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Omit<Entry, 'id' | 'total'>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuário não autenticado.');
        return;
      }

      // Calcula o total
      const total =
        (entry.cash || 0) +
        (entry.debit || 0) +
        (entry.pix || 0) +
        (entry.ifood || 0) +
        (entry.credit || 0) +
        (entry.maqcredit || 0) +
        (entry.maqdebit || 0) +
        (entry.voucher || 0);

      // Monta o payload
      const payload = {
        data: entry.date, // Certifique-se de enviar no formato ISO
        dinheiro: entry.cash || 0,
        debito: entry.debit || 0,
        pix: entry.pix || 0,
        ifood: entry.ifood || 0,
        credito: entry.credit || 0,
        maquinaCredito: entry.maqcredit || 0,
        maquinaDebito: entry.maqdebit || 0,
        voucher: entry.voucher || 0,
        total, // Calculado dinamicamente
        numeroPessoas: entry.numeroPessoas || 0,
      };

      console.log('Payload enviado ao servidor:', payload);

      // Requisição ao backend
      const response = await fetch(`${API_BASE_URL}/entradas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao adicionar entrada:', errorData);
        alert(`Erro: ${errorData.error || 'Erro desconhecido'}`);
        return;
      }

      const newEntry = await response.json();
      setEntries((prev) => [...prev, newEntry]);
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao adicionar entrada.');
    }
  };

  const handleEditEntry = async (entry: Entry) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuário não autenticado.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/entradas/${entry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao editar entrada:', errorData);
        alert(`Erro: ${errorData.error || 'Erro desconhecido'}`);
        return;
      }

      const updatedEntry = await response.json();
      setEntries((prev) =>
        prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
      );
    } catch (error) {
      console.error('Erro ao editar entrada:', error);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuário não autenticado.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/entradas/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== Number(entryId)));
        alert('Entrada excluída com sucesso.');
      } else {
        console.error('Erro ao excluir entrada:', response.statusText);
        alert('Erro ao excluir entrada.');
      }
    } catch (error) {
      console.error('Erro ao excluir entrada:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <DailyEntries
        entries={entries}
        onAddEntry={addEntry}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
        loading={loading}
      />
    </main>
  );
}
