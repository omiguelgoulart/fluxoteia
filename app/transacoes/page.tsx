import { getTransactions } from "./actions/transactions"
import { Summary } from "./components/summary"
import { TransactionsTable } from "./components/transactions-table"

export default async function TransactionsPage() {
  const { transactions, summary } = await getTransactions()

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        <Summary data={summary} />
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}

