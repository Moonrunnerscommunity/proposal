'use client';

import Image from 'next/image';
import TabLayout from './TabLayout';

export default function ParallaxContainer() {
  return (
    <div className="relative w-full min-h-screen">
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
      <div className="fixed sm:bottom-[-100px] bottom-[100px] left-0 right-0 z-10 pointer-events-none">
        <Image
          src="/parallax/mountains.png"
          alt="Mountains"
          width={1600}
          height={1000}
          className="parallax-image object-contain object-bottom w-full"
          unoptimized
        />
      </div>

      {/* Clouds layer - fixed at top right (avoiding sidebar) */}
      <div className="fixed top-5 sm:top-0 left-64 right-0 z-20 pointer-events-none">
        <Image
          src="/parallax/clouds.png"
          alt="Clouds"
          width={1200}
          height={600}
          className="parallax-image object-contain w-full max-w-4xl mx-auto opacity-60"
          unoptimized
        />
      </div>

      {/* Tab Layout with sidebar */}
      <div className="relative z-40">
        <TabLayout />
      </div>
    </div>
  );
} 