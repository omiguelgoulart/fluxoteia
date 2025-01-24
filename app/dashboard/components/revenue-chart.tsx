"use client"

import { Bar, BarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

interface RevenueChartProps {
  data?: Array<{
    date: string
    income: number
    expenses: number
  }>
  isLoading?: boolean
}

export function RevenueChart({ data, isLoading }: RevenueChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Entradas e Saídas</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Entradas e Saídas</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            income: {
              label: "Entradas",
              color: "hsl(var(--primary))",
            },
            expenses: {
              label: "Saídas",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[300px]"
        >
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 24,
            }}
          >
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-expenses)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

