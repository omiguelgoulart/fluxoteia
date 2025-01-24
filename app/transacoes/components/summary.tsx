import { TransactionSummary } from '../types/transaction';

export function Summary({ data }: { data: TransactionSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-500">Total de Entradas</p>
        <p className="text-xl font-bold text-green-500">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.totalInput)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-500">Total de Saídas</p>
        <p className="text-xl font-bold text-red-500">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.totalOutput)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-500">Contas a Pagar</p>
        <p className="text-xl font-bold text-orange-500">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.accountsPayable)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-500">Contas a Receber</p>
        <p className="text-xl font-bold text-blue-500">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.accountsReceivable)}
        </p>
      </div>
    </div>
  );
}
