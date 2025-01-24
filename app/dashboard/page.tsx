'use client'

import { useEffect, useState } from "react"
import { DateRangePicker, DateRange as PickerDateRange } from "./components/date-range-picker"
import { MetricCard } from "./components/metric-card"
import { PerformanceIndicators } from "./components/performance-indicators"
import { RevenueChart } from "./components/revenue-chart"
import { fetchDashboardData } from "./lib/actions"
import { DashboardData, DateRange } from "./types/dashboard"
import { ErrorMessage } from "./components/error-message"


export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null);

  async function loadDashboardData(dateRange?: DateRange) {
    try {
      setIsLoading(true);
      setError(null);
      const dashboardData = await fetchDashboardData(dateRange);
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError('Falha ao carregar dados do dashboard. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleDateRangeChange = (dateRange: PickerDateRange | undefined) => {
    if (dateRange) {
      const customDateRange: DateRange = {
        from: dateRange.from || new Date(),
        to: dateRange.to || new Date()
      };
      loadDashboardData(customDateRange);
    } else {
      loadDashboardData(undefined);
    }
  }

  const formatCurrency = (value?: number) => {
    if (value === undefined) return ''
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Dashboard do Restaurante</h1>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('pt-BR')}
            </span>
            <DateRangePicker 
              className="w-[300px]"
              onChange={handleDateRangeChange}
            />
          </div>
          {error && <ErrorMessage message={error} />}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Total de Entradas Mensais"
            value={formatCurrency(data?.income.value)}
            change={data?.income.change}
            isLoading={isLoading}
          />
          <MetricCard
            title="Total de Saídas Mensais"
            value={formatCurrency(data?.expenses.value)}
            change={data?.expenses.change}
            isLoading={isLoading}
          />
          <MetricCard
            title="Saldo Mensal"
            value={formatCurrency(data?.balance.value)}
            change={data?.balance.change}
            isLoading={isLoading}
          />
        </div>

        <PerformanceIndicators
          averageTicket={data?.averageTicket}
          contributionMargin={data?.contributionMargin}
          isLoading={isLoading}
        />
        
        <RevenueChart
          data={data?.dailyData}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

