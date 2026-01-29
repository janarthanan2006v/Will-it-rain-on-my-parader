import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

type JourneyMapDisplayProps = {
    from: string;
    to: string;
}

export function JourneyMapDisplay({ from, to }: JourneyMapDisplayProps) {
  const directionsEmbedUrl = `https://www.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(to)}&output=embed`;

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Journey Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative rounded-lg overflow-hidden border border-primary/20">
          <iframe
            src={directionsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
