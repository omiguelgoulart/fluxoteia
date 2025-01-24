'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddEntryDialog } from './AddEntryDialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Entry } from '../types/finances';
import { EntryTable } from './EntryTable';

interface DailyEntriesProps {
  entries: Entry[];
  onAddEntry: (entry: Omit<Entry, 'id' | 'total'>) => void;
  onEditEntry: (entry: Entry) => void;
  onDeleteEntry: (entryId: string) => void;
  loading: boolean;
}

export function DailyEntries({
  entries,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
  loading,
}: DailyEntriesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Entradas do Dia</CardTitle>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Entrada
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Carregando entradas...</p>
        ) : (
          <>
            <EntryTable
              entries={entries}
              onEdit={onEditEntry}
              onDelete={onDeleteEntry}
            />
            <AddEntryDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onSubmit={onAddEntry}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
