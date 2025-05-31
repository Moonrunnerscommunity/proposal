'use client';

import Image from 'next/image';
// import CountdownRibbon from './CountdownRibbon';
import HeroSection from './HeroSection';
import TeamSection from './TeamSection';
import CommunicationSection from './CommunicationSection';
import OperationalSection from './OperationalSection';
import WhatsNextSection from './WhatsNextSection';

export default function ParallaxContainer() {
  return (
    <div className="relative w-full">
      {/* Countdown Ribbon - Fixed at top  -- Uncomment when vote goes live */}
      {/* <CountdownRibbon /> */}
      
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallax/bg.png"
          alt="Background"
          fill
          className="parallax-image object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Mountains layer - fixed at bottom */}
      <div className="fixed bottom-[-100px] left-0 right-0 z-10">
        <Image
          src="/parallax/mountains.png"
          alt="Mountains"
          width={1600}
          height={1000}
          className="parallax-image object-contain object-bottom w-full"
          unoptimized
        />
      </div>

      {/* Clouds layer - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Image
          src="/parallax/clouds.png"
          alt="Clouds"
          width={1200}
          height={600}
          className="parallax-image object-contain w-full max-w-4xl mx-auto"
          unoptimized
        />
      </div>

      <div className="fixed top-6 right-6 sm:top-13 sm:right-15 z-50">
        <button onClick={() => window.open('/unstake', '_self')} className="rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 btn-primary border border-[rgba(255,215,0,0.2)] text-starlight font-mono px-4 py-2 shadow-md hover:scale-105 transition-transform">
          Unstaking Portal
        </button>
      </div>

      {/* Content overlay */}
      <div className="relative z-40">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Operational Section */}
        <OperationalSection />
        
        {/* Communication Section */}
        <CommunicationSection />
        
        {/* What's Next Section */}
        <WhatsNextSection />
      </div>
    </div>
  );
} 