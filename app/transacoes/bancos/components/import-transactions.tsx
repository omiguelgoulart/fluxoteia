"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

interface ImportTransactionsProps {
  refreshTransactions: () => void; // Função para atualizar a lista de transações após o upload
}

export function ImportTransactions({ refreshTransactions }: ImportTransactionsProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 🔹 Validação do tipo de arquivo (somente PDFs)
    if (!file.name.endsWith(".pdf")) {
      console.error("❌ Arquivo inválido. Apenas PDFs são aceitos.");
      alert("Por favor, envie um arquivo PDF válido.");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Token de autenticação não encontrado.");
        alert("Erro de autenticação. Faça login novamente.");
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("arquivo", file); // ✅ Nome do campo compatível com o backend

      console.log("📂 Enviando arquivo para processamento...");

      const response = await fetch(`${API_BASE_URL}/bancos/processar-pdf`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Arquivo processado com sucesso!", result);
        alert("Arquivo processado com sucesso!");
        refreshTransactions(); // ✅ Atualiza a lista de transações após o upload
      } else {
        console.error("❌ Erro ao processar arquivo:", response.status, result);
        alert(`Erro ao processar arquivo: ${result.error || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("❌ Erro ao enviar arquivo:", error);
      alert("Erro ao enviar arquivo. Verifique sua conexão e tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="outline" disabled={isUploading} asChild>
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Enviando..." : "Importar PDF"}
          </span>
        </Button>
      </label>
    </div>
  );
}
