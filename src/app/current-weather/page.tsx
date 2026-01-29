"use client"

import { useState, useEffect } from "react";
import { Header } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader, LocateFixed } from "lucide-react";
import { format } from "date-fns";
import { SevenDayForecast } from "@/app/components/weather/seven-day-forecast";
import { HourlyForecastChart } from "@/app/components/weather/hourly-forecast-chart";
import { WeatherSummaryCard } from "@/app/components/weather/weather-summary-card";
import { ProbabilisticAnalysisBox } from "@/app/components/weather/probabilistic-analysis-box";
import { WeatherAlert } from "@/app/components/weather/weather-alert";
import { getDynamicWeather } from "./actions";
import type { CurrentWeatherOutput } from "@/ai/flows/current-weather-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export default function CurrentWeatherPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const [weatherData, setWeatherData] = useState<CurrentWeatherOutput | null>(null);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);

  const { toast } = useToast();

  const refreshLocation = () => {
    setLoadingLocation(true);
    setWeatherData(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        () => {
          // Fallback location
          setLocation({ lat: 37.7749, lon: -122.4194 }); // San Francisco
          setLoadingLocation(false);
          toast({
            title: "Location not found",
            description: "Could not get your location. Using a fallback.",
          })
        }
      );
    } else {
      // Fallback location
      setLocation({ lat: 37.7749, lon: -122.4194 }); // San Francisco
      setLoadingLocation(false);
      toast({
            title: "Geolocation not supported",
            description: "Your browser does not support geolocation. Using a fallback.",
      })
    }
  };
  
  useEffect(() => {
    refreshLocation();
  }, []);

  const handleGetWeather = async () => {
    if (!location || !date) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please select a date and allow location access.",
        });
        return;
    }
    setIsFetchingWeather(true);
    setWeatherData(null);
    try {
      const result = await getDynamicWeather(location.lat, location.lon, format(date, 'yyyy-MM-dd'));
      setWeatherData(result);
    } catch (error) {
      toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Could not fetch weather data. Please try again.",
      });
    } finally {
      setIsFetchingWeather(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="space-y-8">
          <Card className={cn(cardClassName, "shadow-inner shadow-primary/5")}>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Your Location & Date</CardTitle>
              <CardDescription>Select a date and use your device’s location to get a weather forecast.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-input border-input hover:bg-input/80 text-base",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Button onClick={refreshLocation} disabled={loadingLocation} className="hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-shadow">
                    {loadingLocation ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <LocateFixed className="mr-2 h-4 w-4" />}
                    Refresh Location
                  </Button>
                </div>
                <div className="text-right">
                  {loadingLocation ? (
                    <div className="flex items-center justify-end text-muted-foreground">
                        <Loader className="mr-2 h-4 w-4 animate-spin"/>
                        <span>Fetching location...</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Latitude: {location?.lat.toFixed(4)}, Longitude: {location?.lon.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <Button size="lg" disabled={isFetchingWeather || loadingLocation} onClick={handleGetWeather} className="hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-shadow text-lg transform hover:scale-105">
                {isFetchingWeather ? <Loader className="mr-2 h-5 w-5 animate-spin" /> : "Get Weather Forecast"}
            </Button>
          </div>
          
          {(isFetchingWeather || weatherData) &&
            <div className="mt-12 space-y-8 animate-in fade-in duration-500">
                {isFetchingWeather ? <WeatherSkeleton /> : weatherData && (
                    <>
                    <WeatherSummaryCard 
                        location={weatherData.locationName}
                        date={date ? format(date, "MMMM do, yyyy") : ""}
                        riskScore={weatherData.riskScore}
                        description={weatherData.description}
                    />
                    {weatherData.alert && weatherData.alert.title && (
                        <WeatherAlert 
                            title={weatherData.alert.title}
                            description={weatherData.alert.description}
                        />
                    )}
                    <ProbabilisticAnalysisBox 
                        title="Probabilistic Analysis"
                        content={
                          <p className="font-bold text-accent">
                            Next 3 hours rain probability: {weatherData.rainProbability}%
                          </p>
                        }
                    />
                    <div className="grid lg:grid-cols-2 gap-8">
                        <SevenDayForecast />
                        <HourlyForecastChart />
                    </div>
                    </>
                )}
            </div>
          }
        </div>
      </main>
    </div>
  );
}

const WeatherSkeleton = () => (
    <div className="space-y-8">
        <Card className={cardClassName}>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </CardContent>
        </Card>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
         <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
    </div>
)
