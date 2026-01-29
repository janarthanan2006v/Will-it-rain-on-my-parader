import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

type WeatherAlertProps = {
    title: string;
    description: string;
};

export function WeatherAlert({ title, description }: WeatherAlertProps) {
  return (
    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
      <AlertTriangle className="h-5 w-5 text-destructive" />
      <AlertTitle className="font-headline text-xl text-destructive">{title}</AlertTitle>
      <AlertDescription className="text-destructive/90">
        {description}
      </AlertDescription>
    </Alert>
  );
}
