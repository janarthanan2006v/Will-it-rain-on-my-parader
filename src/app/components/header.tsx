import { CloudSun } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("py-6 container mx-auto px-4", className)}>
      <Link href="/" className="flex items-center gap-3 text-2xl font-headline text-foreground w-fit">
        <CloudSun className="w-8 h-8 text-accent" />
        <span>Weather Parader</span>
      </Link>
    </header>
  );
}
