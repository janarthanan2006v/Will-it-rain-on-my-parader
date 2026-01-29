import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cardClassName = "bg-card/50 backdrop-blur-sm border-primary/10";

export function MapDisplay() {
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Location Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative rounded-lg overflow-hidden border border-primary/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44192625243!2d76.8824604439135!3d11.014260900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c85e4596f975!2sCoimbatore%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1620216453982!5m2!1sen!2sus"
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
