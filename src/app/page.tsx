import { ConfigGenerator } from '@/components/config-generator';
import { AdBanner } from '@/components/ad-banner';
import { Gamepad2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-end z-10">
        <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 lg:p-24 bg-background text-foreground pt-24">
        <div className="w-full max-w-4xl flex flex-col items-center text-center mb-12">
          <div 
            className="mb-4 text-primary"
            style={{ filter: `drop-shadow(0 0 8px hsl(var(--primary)))` }}
          >
            <Gamepad2 size={64} />
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            BGMI/PUBG Config Pro
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Unleash peak performance. Generate your ultimate BGMI/PUBG configuration with the power of AI and dominate the battlegrounds.
          </p>
        </div>

        <ConfigGenerator />

        <AdBanner />
      </main>
      <div className="fixed bottom-6 right-6 z-50">
        <Button asChild size="lg" className="rounded-full shadow-lg h-14 px-6">
          <a href="/app-release.apk" download>
            <Download className="mr-2 h-5 w-5" />
            Download APK
          </a>
        </Button>
      </div>
    </>
  );
}
