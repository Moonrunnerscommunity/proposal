'use client';

import Image from 'next/image';
// import CountdownRibbon from './CountdownRibbon';
import HeroSection from './HeroSection';
import TeamSection from './TeamSection';
import CommunicationSection from './CommunicationSection';
import OperationalSection from './OperationalSection';
import WhatsNextSection from './WhatsNextSection';
import ThatsAllFolksSection from './ThatsAllFolksSection';

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
      <div className="fixed sm:bottom-[-100px] bottom-[100px] left-0 right-0 z-10">
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
      <div className="fixed top-5 sm:top-0 left-0 right-0 z-20">
        <Image
          src="/parallax/clouds.png"
          alt="Clouds"
          width={1200}
          height={600}
          className="parallax-image object-contain w-full max-w-4xl mx-auto"
          unoptimized
        />
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
        
        {/* That's All Folks Section */}
        <ThatsAllFolksSection />
      </div>
    </div>
  );
} 