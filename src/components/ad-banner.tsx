import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function AdBanner() {
  return (
    <Card className="mt-8 w-full max-w-4xl p-2 bg-card/50 border-dashed">
      <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
        <Image
          src="https://placehold.co/728x90.png"
          width={728}
          height={90}
          alt="Advertisement"
          className="rounded-md"
          data-ai-hint="advertisement banner"
        />
      </a>
    </Card>
  );
}
