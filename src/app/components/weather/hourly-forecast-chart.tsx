"use client"

import { Bar, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { hourlyForecast } from "@/lib/placeholder-data"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Droplets, Wind } from "lucide-react"

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  precipitation: {
    label: "Precipitation (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export function HourlyForecastChart() {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Hourly Forecast</CardTitle>
        <CardDescription>Temperature (°C) and Precipitation Chance (%) for the next few hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ComposedChart data={hourlyForecast} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
              wrapperStyle={{ outline: 'none' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border) / 0.2)',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--foreground))',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                outline: 'none',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              yAxisId="left" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-1))",
                r: 3
              }}
            />
            <Bar dataKey="precipitation" yAxisId="right" fill="hsl(var(--chart-2))" radius={4} />
          </ComposedChart>
        </ChartContainer>

        <Separator className="my-6 bg-border/20" />

        <div>
            <h3 className="font-headline text-xl mb-4">Weather Impact on Health</h3>
            <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-accent" />
                    <p>
                        <span className="font-semibold text-foreground">Asthma Risk Index:</span>
                        <span className="font-bold text-chart-4 ml-2">Medium</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-accent" />
                    <p>
                        <span className="font-semibold text-foreground">Dehydration Risk:</span>
                        <span className="font-bold text-chart-2 ml-2">Low</span>
                    </p>
                </div>
                 <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    <p>
                        <span className="font-semibold text-foreground">General Advisory:</span>
                        <span className="ml-2">Moderate pollen levels. Take precautions if you have allergies.</span>
                    </p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
