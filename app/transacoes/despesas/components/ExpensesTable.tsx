'use client';

import { useState } from 'react';
import { Expense, ExpenseStatus } from './types';
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ExpensesTableProps = {
  expenses: Expense[];
  onUpdateExpense: (id: string, updatedData: Partial<Expense>) => void;
  onDeleteExpense: (id: string) => void;
  loading: boolean;
  initialExpenses?: Expense[]; // Propriedade opcional
};


export default function ExpensesTable({
  expenses,
  onUpdateExpense,
  onDeleteExpense,
  loading,
}: ExpensesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null); // Controla o ID da despesa em edição
  const [editData, setEditData] = useState<Partial<Expense>>({}); // Dados editáveis da despesa

  // Inicia a edição de uma despesa
  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditData({ ...expense });
  };

  // Cancela a edição
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // Salva as alterações feitas na despesa
  const handleSaveEdit = () => {
    if (editingId) {
      onUpdateExpense(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  // Atualiza os campos editados da despesa
  const handleEditChange = (name: keyof Expense, value: string | number) => {
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Altera o status da despesa
  const handleStatusChange = (expenseId: string, newStatus: ExpenseStatus) => {
    onUpdateExpense(expenseId, { status: newStatus });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data do Pagamento</TableHead>
          <TableHead>Nº / Série</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Subcategoria</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={9}>Carregando...</TableCell>
          </TableRow>
        ) : (
          expenses.map((expense) => (
            <TableRow key={expense.id}>
              {editingId === expense.id ? (
                <>
                  <TableCell>
                    <Input
                      type="date"
                      value={editData.date || ''}
                      onChange={(e) => handleEditChange('date', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editData.number || ''}
                      onChange={(e) => handleEditChange('number', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editData.description || ''}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editData.account || ''}
                      onValueChange={(value) => handleEditChange('account', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma conta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CRESSOL">Cressol</SelectItem>
                        <SelectItem value="BANRISUL">Banrisul</SelectItem>
                        <SelectItem value="IFOOD">iFood</SelectItem>
                        <SelectItem value="STONE">Stone</SelectItem>
                        <SelectItem value="CAIXA_FISICO">Caixa Físico</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editData.category || ''}
                      onChange={(e) => handleEditChange('category', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={editData.subcategory || ''}
                      onChange={(e) => handleEditChange('subcategory', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={editData.amount?.toString() || ''}
                      onChange={(e) => handleEditChange('amount', parseFloat(e.target.value))}
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={editData.status === 'PAGO' ? 'default' : 'destructive'}>
                      {editData.status || expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={handleSaveEdit}>
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{new Date(expense.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{expense.number}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.account}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.subcategory}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(expense.amount)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Badge variant={expense.status === 'PAGO' ? 'default' : 'destructive'}>
                            {expense.status}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(expense.id, 'PAGO')}>
                          Pago
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(expense.id, 'PENDENTE')}>
                          Pendente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(expense)}>
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteExpense(expense.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
