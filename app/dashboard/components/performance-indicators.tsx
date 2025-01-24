import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformanceIndicatorsProps {
  averageTicket?: number
  contributionMargin?: number
  isLoading?: boolean
}

export function PerformanceIndicators({ 
  averageTicket, 
  contributionMargin,
  isLoading 
}: PerformanceIndicatorsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ticket Médio</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-[120px]" />
          ) : (
            <div className="text-2xl font-bold">
              {averageTicket?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Margem de Contribuição</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-[120px]" />
          ) : (
            <div className="text-2xl font-bold text-emerald-500">
              {contributionMargin?.toFixed(1)}%
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

