import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { JourneyStep } from "@/lib/types";

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

function getRiskColorClass(riskLevel: 'low' | 'medium' | 'high') {
    switch (riskLevel) {
        case 'low':
            return 'text-chart-2';
        case 'medium':
            return 'text-chart-4';
        case 'high':
            return 'text-chart-1';
        default:
            return 'text-muted-foreground';
    }
}

type JourneyStepsProps = {
    steps: JourneyStep[];
}

export function JourneySteps({ steps }: JourneyStepsProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Route Weather Details</CardTitle>
        <CardDescription>A step-by-step breakdown of the weather along your route.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {steps.map((step, index) => (
            <li key={step.step}>
              <div className="grid md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-1">
                  <h3 className="font-semibold text-lg text-primary">{`Step ${step.step}: ${step.location}`}</h3>
                  <p className={cn("font-bold", getRiskColorClass(step.riskLevel))}>
                    Risk: {step.risk}/100 ({step.riskLevel})
                  </p>
                </div>
                <div className="md:col-span-2 space-y-2 text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Weather:</span> {step.weatherDesc}</p>
                  <p><span className="font-semibold text-foreground">Analysis:</span> {step.riskExplanation}</p>
                </div>
              </div>
              {index < steps.length - 1 && <Separator className="bg-border/10 mt-6" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
