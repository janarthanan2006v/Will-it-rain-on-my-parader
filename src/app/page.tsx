import { Header } from '@/app/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MapPin, Route, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { MouseFollower } from '@/app/components/mouse-follower';

const features = [
  {
    title: 'Current Weather',
    description: 'Get the latest forecast for your current location instantly.',
    href: '/current-weather',
    icon: MapPin,
  },
  {
    title: 'Custom Location',
    description: 'Check the weather for any specific place and time.',
    href: '/custom-weather',
    icon: SlidersHorizontal,
  },
  {
    title: 'Journey Weather',
    description: 'Plan your trip with weather predictions along your route.',
    href: '/journey-weather',
    icon: Route,
  },
];

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_theme(colors.primary/0.2)] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col";

export default function Home() {
  return (
    <MouseFollower>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground leading-tight">
              Will it Rain on Your Parade?
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get accurate, probabilistic rain forecasts to plan your day, your trip, and your parade with confidence.
            </p>
          </div>

          <div className="mt-20 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title} className="block">
                  <Card className={cn(cardClassName)}>
                    <CardHeader className="flex-row items-center gap-4">
                      <feature.icon className="w-8 h-8 text-accent" />
                      <CardTitle className="text-2xl font-semibold text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-base text-muted-foreground">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </MouseFollower>
  );
}
