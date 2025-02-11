"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";

// Definindo o tipo Result esperado pelo QrReader
import { Result } from "@zxing/library";

export default function QRCodeModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastScannedData, setLastScannedData] = useState<string | null>(null);

  const openModal = () => {
    setModalIsOpen(true);
    setScannedData(null); // Resetar dados ao abrir o modal
    setError(null); // Resetar erros ao abrir o modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setScannedData(null); // Resetar dados ao fechar o modal
    setError(null); // Resetar erros ao fechar o modal
  };

  const handleScan = (result: Result | null | undefined, error: Error | null) => {
    if (result?.getText() && result.getText() !== lastScannedData) {
      // Evitar leitura repetida
      const qrText = result.getText();
      setScannedData(qrText);
      setLastScannedData(qrText);
      closeModal(); // Fechar o modal após a leitura
    }

    if (error) {
      console.error(error);
      if (error.name === "NotAllowedError") {
        setError("Permissão de câmera negada. Por favor, permita o acesso à câmera.");
      } else {
        setError("Erro ao ler o QR code. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button onClick={openModal}>Abrir Câmera e Ler QR Code</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="QR Code Scanner"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Escaneie o QR Code</h2>
          {error && <p className="text-red-500">{error}</p>}
          <QrReader
            onResult={(result, error) => handleScan(result, error ?? null)}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "100%" }}
          />
          <Button onClick={closeModal} className="mt-4">
            Fechar
          </Button>
        </div>
      </Modal>

      {scannedData && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Dados Escaneados:</h3>
          <p>{scannedData}</p>
        </div>
      )}

      <style jsx global>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
        }
      `}</style>
    </div>
  );
}