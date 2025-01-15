"use client"

import { ReactNode } from "react"

export function ChartContainer({ 
  children, 
  config,
  className 
}: { 
  children: ReactNode
  config: any
  className?: string 
}) {
  return <div className={className}>{children}</div>
}

export function ChartTooltip({ content }: { content: any }) {
  return content
}

export function ChartTooltipContent() {
  return <div className="bg-white p-2 shadow rounded" />
} 