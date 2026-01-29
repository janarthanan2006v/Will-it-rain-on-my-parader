import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProbabilisticAnalysisBoxProps = {
    title: string;
    content: React.ReactNode;
};

export function ProbabilisticAnalysisBox({ title, content }: ProbabilisticAnalysisBoxProps) {
  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg text-accent-foreground/80">
        {content}
      </CardContent>
    </Card>
  );
}
