import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Snowflake } from 'lucide-react';

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export function SeasonDisplay() {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Season</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Snowflake className="w-12 h-12 text-accent" />
          <div>
            <p className="text-2xl font-bold">Winter</p>
            <p className="text-muted-foreground">The current season is winter, characterized by cooler temperatures.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
