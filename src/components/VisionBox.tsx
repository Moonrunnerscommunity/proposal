import React from "react";

const VisionBox: React.FC = () => (
  <div className="mb-4 lg:mb-8 w-full flex justify-center transition-all duration-1000 delay-600">
    <div className="glass p-6 sm:p-8 lg:p-8 rounded-lg sm:rounded-xl w-full max-w-4xl">
      {/* Title - responsive typography */}
      <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-300">
        <h6 className="text-responsive-xl font-bold text-white leading-tight text-center">
          😎 Vision ✨
        </h6>
      </div>
      {/* Main vision text */}
      <p className="text-base text-lg text-gray-200 leading-relaxed text-center mb-8">
        We want to bring the Moonrunners back as an engaging, dynamic,
        <span className="text-gradient font-semibold"> community-driven initiative</span>.
        We aim to rekindle excitement, amplify storytelling,
        and ensure continuity of the Moonrunners brand.
      </p>
      {/* TLDR - standout text */}
      <div className="relative flex justify-center">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
          <span className="text-gradient">Protect the Pack At All Costs. <br />Make Moonrunners Fun Again!</span>
        </p>
        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400 opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400 opacity-60"></div>
      </div>
    </div>
  </div>
);

export default VisionBox; 