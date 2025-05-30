'use client';

export default function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center z-50 w-full">
      {/* Background overlay for readability */}
      <div className="absolute inset-0 "></div>
      
      {/* Content container with explicit centering */}
      <div className="relative z-10 w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center flex flex-col items-center">
            
            {/* Logo - responsive sizing */}
            <div className="mb-0 w-full flex justify-center transition-all duration-1000">
              <img
                src="/moonrunners.svg"
                alt="Moonrunners Logo"
                className="pixelated-image w-full h-auto max-h-32 sm:max-h-48 md:max-h-56 lg:max-h-64 max-w-2xl"
                style={{margin:'0 0 -50px 0'}}
              />
            </div>

            {/* Title - responsive typography */}
            <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-300">
              <h1 className="text-responsive-3xl font-bold text-white leading-tight text-center">
                🐺 Community Takeover Proposal 🌙
              </h1>
            </div>

            {/* Vision content with glass morphism */}
            <div className="mb-8 sm:mb-10 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-600">
              <div className="glass p-6 sm:p-8 lg:p-8 rounded-lg sm:rounded-xl w-full max-w-4xl">
                
                {/* Main vision text */}
                <p className="text-base text-md text-gray-200 leading-relaxed text-center mb-4">
                  Our vision is to revitalize Moonrunners as an engaging and dynamic, 
                  <span className="text-gradient font-semibold"> community-driven initiative</span>. 
                  We aim to rekindle excitement, deepen community involvement, amplify storytelling, 
                  and ensure strong continuity of the Moonrunners brand.
                </p>
                
                {/* TLDR - standout text */}
                <div className="relative flex justify-center">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
                    <span className="text-gradient">TLDR:</span> Protect the Pack. Make Moonrunners fun again!
                  </p>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400 opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400 opacity-60"></div>
                </div>
              </div>
            </div>

            {/* Call to action button - single submit vote button */}
            <div className="mb-16 sm:mb-20 lg:mb-24 w-full flex justify-center transition-all duration-1000 delay-900">
              <button className="btn btn-primary px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold">
                💬 Join Discord
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator with enhanced styling */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Scroll to explore</p>
          <div className="text-white text-xl sm:text-2xl animate-bounce cursor-pointer hover:text-yellow-400 transition-colors">
            ↓
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-30">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 border-purple-400"></div>
      </div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-30">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-t-2 border-purple-400"></div>
      </div>
      <div className="absolute bottom-16 left-4 sm:bottom-20 sm:left-8 opacity-30">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-b-2 border-purple-400"></div>
      </div>
      <div className="absolute bottom-16 right-4 sm:bottom-20 sm:right-8 opacity-30">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-b-2 border-purple-400"></div>
      </div>
    </section>
  );
} 