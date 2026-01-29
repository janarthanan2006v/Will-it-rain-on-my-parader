'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState, useTransition } from 'react';
import { Header } from '@/app/components/header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { getAiWeatherAnalysis } from './actions';
import { WeatherSummaryCard } from '../components/weather/weather-summary-card';
import { ProbabilisticAnalysisBox } from '../components/weather/probabilistic-analysis-box';
import { SevenDayForecast } from '../components/weather/seven-day-forecast';
import { HourlyForecastChart } from '../components/weather/hourly-forecast-chart';
import { MapDisplay } from '../components/weather/map-display';
import { SeasonDisplay } from '../components/weather/season-display';

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-shadow text-lg transform hover:scale-105">
      {pending ? <Loader className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
      Search
    </Button>
  );
}

export default function CustomLocationWeatherPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showResults, setShowResults] = useState(false);
  const [submittedLocation, setSubmittedLocation] = useState('');
  
  const initialState = { success: false, data: null, error: null };
  const [state, formAction] = useFormState(getAiWeatherAnalysis, initialState);

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.success) {
      setShowResults(true);
    }
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleFormAction = (formData: FormData) => {
    setSubmittedLocation(formData.get('location') as string);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Custom Location Weather</h1>
            <p className="mt-4 text-lg text-muted-foreground">Get a detailed forecast for any location.</p>
          </div>

          <Card className={cn(cardClassName, "shadow-inner shadow-primary/5")}>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Enter a Location & Date</CardTitle>
              <CardDescription>Type in a city or address and select a date to get the weather forecast.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleFormAction} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input name="location" placeholder="e.g., San Francisco, CA" required className="bg-input border-input h-12 text-base" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-input border-input h-12 text-base",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <input type="hidden" name="date" value={date ? format(date, 'yyyy-MM-dd') : ''} />
                </div>
                <div>
                  <Textarea name="query" placeholder="Personalised Query (Optional) e.g., 'Will it be very windy?'" className="bg-input border-input text-base" />
                </div>
                <div className="flex justify-center">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>

          {showResults && state.data && (
            <div className="mt-12 space-y-8 animate-in fade-in duration-500">
              <WeatherSummaryCard
                location={submittedLocation}
                date={date ? format(date, "MMMM do, yyyy") : ""}
                riskScore={state.data.riskScore}
                description={state.data.description}
              />
              {state.data.answer && (
                <ProbabilisticAnalysisBox
                    title="Personalized AI Analysis"
                    content={
                        <p>{state.data.answer}</p>
                    }
                />
              )}
              <div className="grid lg:grid-cols-2 gap-8">
                <SevenDayForecast />
                <HourlyForecastChart />
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <MapDisplay />
                <SeasonDisplay />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
