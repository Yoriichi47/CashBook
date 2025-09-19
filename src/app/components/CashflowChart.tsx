"use client"

import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type CashflowRecord = {
  month: number | string
  income: number
  expense: number
}[]

const chartConfig = {
  income: {
    label: "Income",
    color: "#15a349",
  },
  expense: {
    label: "Expense",
    color: "#db2525",
  },
} satisfies ChartConfig

export function CashflowChart({data}: {data: CashflowRecord}) {

    const chartData = data || []

    if(chartData.length === 0){
        return <div className="p-4 text-center">No data available for viewing.</div>
    }

  return (
    <>
    <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
         <XAxis
      dataKey="month"
      tickMargin={10}
      />
    <YAxis
    tickFormatter={(value) => {
        return `${new Intl.NumberFormat('en-US').format(value)}`;
    }}
    tickMargin={10}
     />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Legend verticalAlign="top" align="right" height={30} iconType="circle" formatter={(Value) => {
        return <span className="capitalize text-black">{Value}</span>
    }} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
    </>
  )
}
