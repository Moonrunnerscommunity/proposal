import React from "react";

const UnstakingPortal: React.FC = () => (
  <div className="mb-4 lg:mb-8 w-full flex justify-center transition-all duration-1000 delay-600">
    <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl p-8 w-full max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-cyan-600/5"></div>
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Unstaking Portal
        </h3>
        <p className="text-lg text-purple-200 mb-8 leading-relaxed">
          The Unstaking Portal is open! Retrieve your staked Primordia Land, Moonrunners, and Dragonhorde NFTs and reclaim your rightful place in the hunt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 border-2 border-white/20"
            onClick={() => window.open('/unstake', '_self')}
          >
            🔓 Unstake Your NFTs
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default UnstakingPortal; 