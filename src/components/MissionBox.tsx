import React from "react";

const MissionBox: React.FC = () => (
  <div className="mb-4 lg:mb-8 w-full flex justify-center transition-all duration-1000 delay-600">
    <div className="glass p-6 sm:p-8 lg:p-8 rounded-lg sm:rounded-xl w-full max-w-4xl flex flex-col items-center">
      <h6 className="text-responsive-xl font-bold text-white leading-tight text-center mb-4">
        🚀 Mission ⭐
      </h6>
      <p className="text-base text-lg text-gray-200 leading-relaxed text-center">
            Our mission is to rebuild Moonrunners on the foundation of <span className="text-gradient font-semibold">transparency, communication, and community</span>. We share every decision <span className="text-gradient font-semibold">openly</span>, keep dialogue flowing across <span className="text-gradient font-semibold">all channels</span>, and treat every holder as a <span className="text-gradient font-semibold">co-architect</span> of the project&apos;s future.
      </p>

      {/* Decorative Values Section */}
      <div className="mt-8 w-full flex flex-col sm:flex-row justify-center items-center gap-6">
        {/* Transparency */}
        <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 shadow-md w-full sm:w-1/3 transition-transform hover:scale-105">
          <span className="text-3xl mb-2" role="img" aria-label="Transparency">🔍</span>
          <span className="font-semibold text-gradient text-lg mb-1">Transparency</span>
          <span className="text-gray-300 text-sm text-center">Every decision, every step, out in the open.</span>
        </div>
        {/* Communication */}
        <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 shadow-md w-full sm:w-1/3 transition-transform hover:scale-105">
          <span className="text-3xl mb-2" role="img" aria-label="Communication">💬</span>
          <span className="font-semibold text-gradient text-lg mb-1">Communication</span>
          <span className="text-gray-300 text-sm text-center">Dialogue that never stops, across all channels.</span>
        </div>
        {/* Community */}
        <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 shadow-md w-full sm:w-1/3 transition-transform hover:scale-105">
          <span className="text-3xl mb-2" role="img" aria-label="Community">🤝</span>
          <span className="font-semibold text-gradient text-lg mb-1">Community</span>
          <span className="text-gray-300 text-sm text-center">Every holder is a co-architect of our future.</span>
        </div>
      </div>
    </div>
  </div>
);

export default MissionBox; 