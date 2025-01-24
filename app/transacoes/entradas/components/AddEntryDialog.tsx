'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Entry } from '../types/finances';

interface AddEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (entry: Omit<Entry, 'total'>) => void;
}

export function AddEntryDialog({ open, onOpenChange, onSubmit }: AddEntryDialogProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    cash: '',
    debit: '',
    pix: '',
    ifood: '',
    credit: '',
    maqcredit: '',
    maqdebit: '',
    voucher: '',
    numeroPessoas: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry: Omit<Entry, 'total'> = {
      id: Date.now(), // or any other logic to generate a unique id
      date: formData.date,
      cash: Number(formData.cash) || 0,
      debit: Number(formData.debit) || 0,
      pix: Number(formData.pix) || 0,
      ifood: Number(formData.ifood) || 0,
      credit: Number(formData.credit) || 0,
      maqcredit: Number(formData.maqcredit) || 0,
      maqdebit: Number(formData.maqdebit) || 0,
      voucher: Number(formData.voucher) || 0,
      numeroPessoas: Number(formData.numeroPessoas) || 0,
    };

    onSubmit(entry);
    onOpenChange(false);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      cash: '',
      debit: '',
      pix: '',
      ifood: '',
      credit: '',
      maqcredit: '',
      maqdebit: '',
      voucher: '',
      numeroPessoas: '',
    });

    console.log(entry);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Nova Entrada</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cash">Dinheiro</Label>
              <Input
                id="cash"
                type="number"
                step="0.01"
                value={formData.cash}
                onChange={(e) => setFormData({ ...formData, cash: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="debit">Débito</Label>
              <Input
                id="debit"
                type="number"
                step="0.01"
                value={formData.debit}
                onChange={(e) => setFormData({ ...formData, debit: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pix">PIX</Label>
              <Input
                id="pix"
                type="number"
                step="0.01"
                value={formData.pix}
                onChange={(e) => setFormData({ ...formData, pix: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ifood">iFood</Label>
              <Input
                id="ifood"
                type="number"
                step="0.01"
                value={formData.ifood}
                onChange={(e) => setFormData({ ...formData, ifood: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="credit">Crédito</Label>
              <Input
                id="credit"
                type="number"
                step="0.01"
                value={formData.credit}
                onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maqcredit">Máquina Crédito</Label>
              <Input
                id="maqcredit"
                type="number"
                step="0.01"
                value={formData.maqcredit}
                onChange={(e) => setFormData({ ...formData, maqcredit: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maqdebit">Máquina Débito</Label>
              <Input
                id="maqdebit"
                type="number"
                step="0.01"
                value={formData.maqdebit}
                onChange={(e) => setFormData({ ...formData, maqdebit: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="voucher">Voucher</Label>
              <Input
                id="voucher"
                type="number"
                step="0.01"
                value={formData.voucher}
                onChange={(e) => setFormData({ ...formData, voucher: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="numeroPessoas">Número de Pessoas</Label>
            <Input
              id="numeroPessoas"
              type="number"
              value={formData.numeroPessoas}
              onChange={(e) => setFormData({ ...formData, numeroPessoas: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
