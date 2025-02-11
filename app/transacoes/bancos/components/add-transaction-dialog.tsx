"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CalendarIcon } from "lucide-react";
import { type Transaction, AccountType } from "../types/transaction";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AddTransactionDialogProps {
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
}

export function AddTransactionDialog({ addTransaction }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [account, setAccount] = useState<AccountType | "">("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async () => {
    if (!date) {
      alert("Por favor, selecione uma data.");
      return;
    }

    if (!account || !description || isNaN(parseFloat(amount))) {
      alert("Todos os campos são obrigatórios e o valor deve ser um número válido.");
      return;
    }

    const transaction: Omit<Transaction, "id"> = {
      date: date.toISOString(), // Envia a data no formato ISO (aceito pelo Zod como Date)
      account: account.toUpperCase() as AccountType,
      description: description.trim(),
      amount: parseFloat(amount), // Garante que seja um número
    };

    try {
      await addTransaction(transaction);
      setOpen(false);

      // Limpa os campos após a submissão
      setDate(undefined);
      setAccount("");
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("❌ Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação. Tente novamente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Entrada
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Entrada</DialogTitle>
          <DialogDescription>Preencha os dados da entrada bancária abaixo</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Campo de Data com Calendário */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Data
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Campo de Conta */}
          <div>
            <label htmlFor="account" className="block text-sm font-medium mb-1">
              Conta
            </label>
            <Select value={account} onValueChange={(value) => setAccount(value as AccountType)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AccountType).map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo de Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Descrição
            </label>
            <Input
              id="description"
              placeholder="Ex: Pix recebido, Recebimento de vendas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Campo de Valor */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Valor
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Botão de Salvar */}
          <Button onClick={handleSubmit} className="w-full">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}