'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Route } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export default function JourneyWeatherPage() {
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    const dateFrom = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
    const dateTo = date?.to ? format(date.to, 'yyyy-MM-dd') : '';
    
    const params = new URLSearchParams({ from, to, dateFrom, dateTo });
    router.push(`/journey-weather/results?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Journey Weather</h1>
            <p className="mt-4 text-lg text-muted-foreground">Plan your route with weather forecasts for every step of your journey.</p>
          </div>

          <Card className={cn(cardClassName, "shadow-inner shadow-primary/5")}>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Plan Your Journey</CardTitle>
              <CardDescription>Enter a start and end location, and select your travel dates to get a weather forecast.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input name="from" placeholder="Starting Point (e.g., New York, NY)" required className="bg-input border-input h-12 text-base" />
                  <Input name="to" placeholder="Destination (e.g., Los Angeles, CA)" required className="bg-input border-input h-12 text-base" />
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-input border-input h-12 text-base",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick your travel dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-shadow text-lg transform hover:scale-105">
                    <Route className="mr-2 h-5 w-5" />
                    Get Journey Forecast
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
