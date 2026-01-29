'use client';

import { Suspense, useState, useEffect } from 'react';
import { Header } from "@/app/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from 'next/navigation';
import { JourneyTimeline } from '@/app/components/weather/journey-timeline';
import { JourneyMapDisplay } from '@/app/components/weather/journey-map-display';
import { JourneySteps } from '@/app/components/weather/journey-steps';
import { getJourneyWeatherData } from '../actions';
import type { JourneyStep } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

function JourneyResults() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [steps, setSteps] = useState<JourneyStep[]>([]);

  useEffect(() => {
    if (from && to) {
      setLoading(true);
      getJourneyWeatherData(from, to).then(data => {
        if (data) {
          setSummary(data.summary);
          setSteps(data.steps);
        }
        setLoading(false);
      });
    } else {
        setLoading(false);
    }
  }, [from, to]);

  if (loading) {
      return <JourneySkeleton />;
  }

  if (!steps.length) {
      return (
          <Card className={cardClassName}>
              <CardHeader>
                  <CardTitle className="font-headline text-3xl">No Journey Data</CardTitle>
              </CardHeader>
              <CardContent>
                  <p>Please go back and enter a starting point and destination to see your journey forecast.</p>
              </CardContent>
          </Card>
      );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className={cardClassName}>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Journey Summary</CardTitle>
          <CardDescription>An overview of the weather conditions for your trip from {from} to {to}.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-foreground">{summary}</p>
          </div>
        </CardContent>
      </Card>

      <JourneySteps steps={steps} />

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <JourneyTimeline steps={steps} />
        </div>
        <div className="lg:col-span-2">
            <JourneyMapDisplay from={from} to={to} />
        </div>
      </div>

    </div>
  );
}

function JourneySkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <Card className={cardClassName}>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>

            <Card className={cardClassName}>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="grid md:grid-cols-3 gap-4 items-start">
                            <div className="md:col-span-1 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card className={cardClassName}>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[350px] w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card className={cardClassName}>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="aspect-video w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function JourneyWeatherResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Suspense fallback={<JourneySkeleton />}>
          <JourneyResults />
        </Suspense>
      </main>
    </div>
  );
}
