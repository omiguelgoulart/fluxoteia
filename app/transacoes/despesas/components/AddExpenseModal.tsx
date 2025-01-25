"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import type { Expense } from "./types";
import { QrReader } from "react-qr-reader";
import { fetchCupomData } from "../utils/api-utils";

type AddExpenseModalProps = {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
  onQrCodeScanned?: (qrCodeData: string) => Promise<void>;
};

export default function AddExpenseModal({ onAddExpense }: AddExpenseModalProps) {
  const [formData, setFormData] = useState<Omit<Expense, "id">>({
    date: new Date().toISOString().split("T")[0],
    number: "",
    description: "",
    account: "",
    category: "",
    subcategory: "",
    amount: 0,
    status: "PENDENTE",
  });

  const [isQrReaderOpen, setQrReaderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQrScanSuccess = async (qrCodeData: string) => {
    setQrReaderOpen(false);
    setIsLoading(true);

    try {
      const cupomData = await fetchCupomData(qrCodeData);
      setFormData((prev) => ({
        ...prev,
        number: cupomData.number || "",
        description: cupomData.nome || "",
        amount: Number.parseFloat(cupomData.valor.replace(",", ".")) || 0,
        date: cupomData.data || prev.date,
      }));
    } catch (error) {
      console.error("Erro ao processar os dados do QR Code:", error);
      alert("Erro ao processar os dados do QR Code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.account || !formData.category || !formData.subcategory || formData.amount <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Dados enviados ao servidor:", formData);

    onAddExpense(formData);

    setFormData({
      date: new Date().toISOString().split("T")[0],
      number: "",
      description: "",
      account: "",
      category: "",
      subcategory: "",
      amount: 0,
      status: "PENDENTE",
    });
  };

  const subcategoriasPorCategoria: { [key: string]: string[] } = {
    CUSTOS_OPERACAO: [
      "Carnes",
      "Hortifruti",
      "Grãos e farináceos",
      "Laticínios",
      "Bebidas",
      "Embalagens",
      "Produtos descartáveis",
      "Gás de cozinha",
    ],
    DESPESAS_FIXAS: [
      "Aluguel",
      "Salários e encargos sociais",
      "Pró-labore",
      "Energia elétrica",
      "Água e esgoto",
      "Internet e telefone",
      "Manutenção",
      "Seguros",
    ],
    DESPESAS_VARIAVEIS: ["Taxas de cartões", "Comissão de aplicativos", "Embalagens adicionais", "Frete de delivery"],
    DESPESAS_ADMINISTRATIVAS: [
      "Contabilidade",
      "Software de gestão",
      "Consultorias",
      "Treinamentos",
      "Marketing e publicidade",
      "Assinaturas",
    ],
    OUTRAS_DESPESAS: ["Multas e juros", "Imprevistos"],
    IMPOSTOS_CONTRIBUICOES: ["Simples Nacional", "INSS/FGTS", "Taxas municipais"],
    OUTRAS_RECEITAS: ["Juros recebidos", "Descontos recebidos", "Outras receitas não operacionais"],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Adicionar Despesa
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Nova Despesa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova despesa abaixo ou escaneie um QR Code para preencher automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Dialog open={isQrReaderOpen} onOpenChange={setQrReaderOpen}>
            <DialogTrigger asChild>
              <Button type="button" disabled={isLoading}>
                {isLoading ? "Carregando..." : "Escanear QR Code"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Escanear QR Code</DialogTitle>
              </DialogHeader>
              <QrReader
                onResult={(result) => {
                  if (result) {
                    handleQrScanSuccess(result.getText());
                  }
                }}
                constraints={{ facingMode: "environment" }}
                containerStyle={{ width: "100%" }}
              />
              <DialogFooter>
                <Button onClick={() => setQrReaderOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="space-y-2">
            <Label htmlFor="date">Data do Pagamento</Label>
            <Input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Nº/Série</Label>
            <Input type="text" id="number" name="number" value={formData.number} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Conta</Label>
            <Select value={formData.account} onValueChange={(value) => handleSelectChange("account", value)}>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                handleSelectChange("category", value);
                setFormData((prev) => ({ ...prev, subcategory: "" }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(subcategoriasPorCategoria).map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.category && (
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategoria</Label>
              <Select value={formData.subcategory} onValueChange={(value) => handleSelectChange("subcategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma subcategoria" />
                </SelectTrigger>
                <SelectContent>
                  {subcategoriasPorCategoria[formData.category].map((subcategoria) => (
                    <SelectItem key={subcategoria} value={subcategoria}>
                      {subcategoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount.toString()}
              onChange={handleInputChange}
              required
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDENTE">Pendente</SelectItem>
                <SelectItem value="PAGO">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <DialogTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogTrigger>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
