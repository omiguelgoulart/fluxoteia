import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Entry } from '../types/finances';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface EntryTableProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void; // Função para editar uma entrada
  onDelete: (entryId: string) => void; // Função para deletar uma entrada
}

export function EntryTable({ entries, onEdit, onDelete }: EntryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>DATA</TableHead>
          <TableHead>DINHEIRO</TableHead>
          <TableHead>DÉBITO</TableHead>
          <TableHead>PIX</TableHead>
          <TableHead>IFOOD</TableHead>
          <TableHead>CRÉDITO</TableHead>
          <TableHead>MÁQUINA CRÉDITO</TableHead>
          <TableHead>MÁQUINA DÉBITO</TableHead>
          <TableHead>VOUCHER</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>N° PESSOAS</TableHead>
          <TableHead>AÇÕES</TableHead> {/* Nova coluna para os botões */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => (
          <TableRow key={`${entry.date}-${index}`}>
            <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR')}</TableCell>
            <TableCell>R$ {(entry.cash ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.debit ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.pix ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.ifood ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.credit ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.maqcredit ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.maqdebit ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.voucher ?? 0).toFixed(2)}</TableCell>
            <TableCell>R$ {(entry.total ?? 0).toFixed(2)}</TableCell>
            <TableCell>{entry.numeroPessoas ?? 0}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                {/* Botão para Alterar */}
                <Button variant="ghost" size="icon" onClick={() => onEdit(entry)}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
                {/* Botão para Excluir */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(entry.id.toString())}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
