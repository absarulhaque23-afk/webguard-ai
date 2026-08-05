import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { MLPipeline } from '@/components/landing/MLPipeline';
import { Stats } from '@/components/landing/Stats';
import { FAQ } from '@/components/landing/FAQ';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <MLPipeline />
      <Stats />
      <FAQ />
      <Footer />
    </main>
  );
}
