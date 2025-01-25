'use client';

import { Transaction } from "../types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="rounded-md border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="w-[100px]">DATA</TableHead>
            <TableHead className="w-[200px]">DETALHES</TableHead>
            <TableHead>CONTA UTILIZADA</TableHead>
            <TableHead className="text-right">VALOR DE ENTRADA</TableHead>
            <TableHead className="text-right">VALOR DE SAÍDA</TableHead>
            <TableHead className="text-center w-[100px]">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.details}</TableCell>
              <TableCell>{transaction.account}</TableCell>
              <TableCell className="text-right text-green-500">
                {transaction.inputValue
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.inputValue)
                  : '-'}
              </TableCell>
              <TableCell className="text-right text-red-500">
                {transaction.outputValue
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.outputValue)
                  : '-'}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={transaction.status === 'RECEBIDO' ? 'secondary' : 'default'}
                  className="w-20"
                >
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
