export interface MetricData {
    value: number
    change: number
  }
  
  export interface DashboardData {
    income: MetricData
    expenses: MetricData
    balance: MetricData
    averageTicket: number
    contributionMargin: number
    dailyData: {
      date: string
      income: number
      expenses: number
    }[]
  }
  
  export interface DateRange {
    from: Date
    to: Date
  }
  
  