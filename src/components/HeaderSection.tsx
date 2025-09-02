'use client';

import Image from 'next/image';

export default function HeaderSection() {
  return (
    <section className="relative flex items-center justify-center z-50 w-full pt-8 pb-4">
      <div className="relative z-10 w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center flex flex-col items-center">
            
            {/* Logo - responsive sizing */}
            <div className="mb-0 w-full flex justify-center transition-all duration-1000">
              <Image
                src="/moonrunners.svg"
                alt="Moonrunners Logo"
                width={512}
                height={256}
                className="pixelated-image w-full h-auto max-h-32 sm:max-h-48 md:max-h-56 lg:max-h-64 max-w-2xl"
                priority
              />
            </div>

            {/* Title - responsive typography */}
            <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-300">
              <h1 className="text-responsive-3xl font-bold text-white leading-tight text-center">
                🐺 Community Takeover Progress 🌙
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}