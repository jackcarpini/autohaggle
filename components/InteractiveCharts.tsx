'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const savingsData = [
  { month: 'Jan', savings: 1000 },
  { month: 'Feb', savings: 1500 },
  { month: 'Mar', savings: 2000 },
  { month: 'Apr', savings: 2500 },
  { month: 'May', savings: 3000 },
  { month: 'Jun', savings: 3500 },
]

const compareData = [
  { price: 'Market Average', amount: 25000 },
  { price: 'Your Quote', amount: 23500 },
  { price: 'Lowest Quote', amount: 22000 },
]

export default function InteractiveCharts() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-12">
          See the AutoHaggle Advantage
        </h2>
        <Tabs defaultValue="savings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="savings">User Savings</TabsTrigger>
            <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Average User Savings Over Time</CardTitle>
                <CardDescription>Monthly savings for AutoHaggle users</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    savings: {
                      label: "Savings",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={savingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="var(--color-savings)" 
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Price Comparison</CardTitle>
                <CardDescription>See how your quote compares</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={compareData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="price" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar 
                        dataKey="amount" 
                        fill="var(--color-amount)"
                        onMouseEnter={handleMouseEnter}
                        animationBegin={200}
                        animationDuration={500}
                      >
                        {compareData.map((entry, index) => (
                          <motion.rect
                            key={`cell-${index}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              fill: index === activeIndex ? 'var(--color-amount-highlight)' : 'var(--color-amount)'
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

