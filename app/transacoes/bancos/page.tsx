"use client";

import { useEffect, useState } from "react";
import { AddTransactionDialog } from "./components/add-transaction-dialog";
import { TransactionsTable } from "./components/transactions-table";
import { Transaction, AccountType } from "./types/transaction";
import { ImportTransactions } from "./components/import-transactions";
import { API_BASE_URL } from "@/lib/config";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [, setLoading] = useState(false);

  // 🔍 Função para buscar transações da API
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

    console.log("🔍 Buscando transações da API...");
    const response = await fetch(`${API_BASE_URL}/bancos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("📄 Dados recebidos da API:", data);
      setTransactions(data);
    } else {
      console.error("❌ Erro ao buscar transações", response.status);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 🚀 Função para adicionar uma transação manualmente
  const addTransaction = async (data: Omit<Transaction, "id">) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    // 📌 Validação dos dados antes do envio
    if (!data.date || !data.account || !data.description || isNaN(Number(data.amount))) {
      console.error("❌ Erro: Todos os campos são obrigatórios e amount deve ser um número!");
      setLoading(false);
      return;
    }

    // ✅ Formatar os dados corretamente antes do envio
    const formattedData = {
      ...data,
      amount: Number(data.amount),
      account: data.account.toUpperCase() as AccountType,
    };

    console.log("🚀 Enviando dados para a API:", JSON.stringify(formattedData, null, 2));

    const response = await fetch(`${API_BASE_URL}/bancos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formattedData),
    });

    if (response.ok) {
      console.log("✅ Transação adicionada com sucesso!");
      fetchTransactions();
    } else {
      const errorData = await response.json();
      console.error("❌ Erro ao adicionar transação:", response.status, errorData);
      alert(`Erro ao adicionar transação: ${errorData.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Livro Caixa</h1>
        <div className="flex items-center gap-4">
          <ImportTransactions refreshTransactions={fetchTransactions} />
          <AddTransactionDialog addTransaction={addTransaction} />
        </div>
      </div>
      <TransactionsTable transactions={transactions} refreshTransactions={fetchTransactions} />
    </div>
  );
}