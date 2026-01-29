import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sevenDayForecast } from "@/lib/placeholder-data";
import { WeatherIcon } from "../weather-icon";

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export function SevenDayForecast() {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">7-Day Forecast</CardTitle>
        <CardDescription>The upcoming weather for the week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sevenDayForecast.map((day, index) => (
            <li key={day.day}>
              <div className={`flex items-center gap-4 p-2 rounded-lg ${index === 0 ? 'bg-primary/10' : ''}`}>
                <WeatherIcon icon={day.icon} className="w-8 h-8 text-accent" />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{day.day}</p>
                  <p className="text-muted-foreground">{day.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{day.tempHigh}° / {day.tempLow}°</p>
                  <p className="text-muted-foreground">Precip: {day.precip}%</p>
                </div>
              </div>
              {index < sevenDayForecast.length - 1 && <Separator className="bg-border/10 mt-2" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
