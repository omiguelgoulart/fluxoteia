import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionActions } from "./transaction-actions";
import type { Transaction } from "../types/transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
  refreshTransactions: () => void;
}

export function TransactionsTable({ transactions, refreshTransactions }: TransactionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Conta</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
                </TableCell> 
              <TableCell>{transaction.account}</TableCell>
              <TableCell>{transaction.description}</TableCell>
                <TableCell >
                {transaction.amount
                  ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)
                  : "-"}
                </TableCell>
              <TableCell>
                <TransactionActions transaction={transaction} refreshTransactions={refreshTransactions} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
