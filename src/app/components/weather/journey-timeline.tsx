"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { JourneyStep } from "@/lib/types";

const chartConfig = {
  risk: {
    label: "Risk Score",
  },
  low: {
    color: "hsl(var(--chart-2))", // blueish
  },
  medium: {
    color: "hsl(var(--chart-4))", // yellowish
  },
  high: {
    color: "hsl(var(--chart-1))", // orangish
  },
} satisfies ChartConfig

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

type JourneyTimelineProps = {
    steps: JourneyStep[];
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
    if (!steps || steps.length === 0) {
        return null;
    }
    const data = steps.map(step => ({
        ...step,
        fill: chartConfig[step.riskLevel].color
    }));

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Journey Risk Timeline</CardTitle>
        <CardDescription>Visualizing weather risk at each stage of your journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)" />
            <XAxis type="number" dataKey="risk" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis 
                type="category" 
                dataKey="location" 
                width={100} 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--foreground))' }}
                interval={0}
            />
            <Tooltip
                cursor={{ fill: 'hsla(var(--muted), 0.5)' }}
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
            <Bar dataKey="risk" layout="vertical" radius={4}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
