import { Card, CardContent } from "@/components/ui/card"
import { TransactionSummary } from "../types/transaction"

export function Summary({ data }: { data: TransactionSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6">
          <div className="text-sm font-medium text-muted-foreground">VALOR DE ENTRADAS</div>
          <div className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(data.totalInput)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6">
          <div className="text-sm font-medium text-muted-foreground">VALOR DE SAÍDAS</div>
          <div className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(data.totalOutput)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6">
          <div className="text-sm font-medium text-muted-foreground">CONTAS A PAGAR</div>
          <div className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(data.accountsPayable)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6">
          <div className="text-sm font-medium text-muted-foreground">CONTAS A RECEBER</div>
          <div className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(data.accountsReceivable)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

