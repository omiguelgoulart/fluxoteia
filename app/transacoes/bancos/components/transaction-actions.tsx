"use client";

import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Transaction, AccountType } from "../types/transaction";
import { API_BASE_URL } from "@/lib/config";



interface TransactionActionsProps {
  transaction: Transaction;
  refreshTransactions: () => void;
}

export function TransactionActions({ transaction, refreshTransactions }: TransactionActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<Transaction>({
    defaultValues: transaction,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (data: Transaction) => {
    const token = localStorage.getItem("token"); // Recupera o token do localStorage
  
    const response = await fetch(`${API_BASE_URL}/bancos/${transaction.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      refreshTransactions(); // Atualiza a lista de transações
      setIsEditing(false); // Fecha o diálogo de edição
    } else {
      console.error("Erro ao atualizar transação");
    }
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      const token = localStorage.getItem("token"); // Recupera o token do localStorage
  
      const response = await fetch(`${API_BASE_URL}/bancos/${transaction.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });
  
      if (response.ok) {
        refreshTransactions();
      } else {
        console.error("Erro ao excluir transação");
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Botão de Editar */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8 p-0 hover:bg-muted">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar transação</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AccountType).map((account) => (
                          <SelectItem key={account} value={account}>
                            {account}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex: Pix recebido, Recebimento de vendas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Salvar Alterações</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Botão de Excluir */}
      <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 p-0 hover:bg-muted">
        <Trash className="h-4 w-4" />
        <span className="sr-only">Excluir transação</span>
      </Button>
    </div>
  );
}
