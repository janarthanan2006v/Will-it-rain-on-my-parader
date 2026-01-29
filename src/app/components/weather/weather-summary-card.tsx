import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type WeatherSummaryCardProps = {
    location: string;
    date: string;
    riskScore: number;
    description: string;
};

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export function WeatherSummaryCard({ location, date, riskScore, description }: WeatherSummaryCardProps) {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-3xl">Weather for {location} on {date}</CardTitle>
            <Badge className="bg-primary/80 text-primary-foreground text-sm">Risk Score: {riskScore}/100</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
            {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
