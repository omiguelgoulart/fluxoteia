import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricCardProps {
  title: string
  value?: string
  change?: number
  isLoading?: boolean
}

export function MetricCard({ title, value, change, isLoading }: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-[120px] mb-2" />
            <Skeleton className="h-4 w-[100px]" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {change !== undefined && (
              <p
                className={cn(
                  "mt-2 text-xs",
                  change > 0 ? "text-emerald-500" : "text-destructive"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}% em relação ao mês passado
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

