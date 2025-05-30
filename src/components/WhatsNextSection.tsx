'use client';

import React, { useEffect, useState } from 'react';

const WhatsNextSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const possibilities = [
    {
      icon: '🌙',
      title: 'New Horizons',
      description: 'Exploring uncharted territories in the digital landscape'
    },
    {
      icon: '📚',
      title: 'Lore',
      description: 'Expanding the rich universe and storytelling of Moonrunners'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Growing together as a vibrant, engaged collective'
    },
    {
      icon: '✨',
      title: 'Magic',
      description: 'Creating experiences that surprise and delight'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 z-50">
      {/* Subtle parallax background effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      ></div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white pixel-text">
            What's Next
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-2xl text-purple-200 leading-relaxed mb-8">
              The future of Moonrunners holds many exciting possibilities. While we have numerous ideas 
              for expanding and enhancing the project, we're committed to moving forward thoughtfully 
              and with community input every step of the way.
            </p>
          </div>
        </div>

        {/* Floating Possibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {possibilities.map((item, index) => (
            <div 
              key={item.title}
              className="relative group"
              style={{ 
                animationDelay: `${index * 200}ms`,
                transform: `translateY(${Math.sin((scrollY + index * 200) * 0.002) * 8}px)`
              }}
            >
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-500 hover:transform hover:scale-105 group-hover:bg-black/40">
                {/* Floating Icon */}
                <div className="text-6xl mb-6 text-center group-hover:animate-pulse">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-purple-200 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 pixel-text">
              Timeline
            </h3>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Our roadmap to bringing the Moonrunners vision to life
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* 90 Days */}
            <div className="relative group">
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20">
                      First 90 Days
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed">
                      Engage community, stabilize expectations, relaunch lore, reboot social media, 
                      beta test video game (if feasible).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Months */}
            <div className="relative group">
              <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20">
                      First 6 Months
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed">
                      Reboot web properties, NFT.NYC event, merch store launch, complete novel draft, 
                      research toys/games, market aggressively, possible video game release.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 12 Months */}
            <div className="relative group">
              <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20">
                      First 12 Months
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed">
                      Host DragonCon event, release novel, launch toys in time for holidays, 
                      develop tabletop game, explore audiobook production (like Soundbooth Theater!)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Message */}
        <div className="text-center">
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                The Adventure Continues 🌙
              </h3>
              
              <div className="space-y-6 text-lg md:text-xl text-purple-200 leading-relaxed max-w-3xl mx-auto">
                <p>
                  Our focus will be on <span className="text-yellow-300 font-semibold">sustainable growth</span> and 
                  maintaining the core essence of what makes Moonrunners special.
                </p>
                
                <p>
                  We believe in community-driven development and will adapt our journey based on 
                  feedback, discoveries, and the ever-evolving landscape of possibilities.
                </p>
              </div>

              {/* Future indicator */}
              <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-4 text-purple-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">Stay tuned</span>
                    <span className="text-3xl animate-bounce">→</span>
                    <span className="text-xl">Amazing things ahead</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNextSection; 