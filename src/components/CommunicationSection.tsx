'use client';

import React, { useEffect, useState } from 'react';

const CommunicationSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const commitments = [
    { 
      period: 'Daily', 
      title: 'Gms', 
      description: 'Daily gms and community engagement to keep the vibes high and connections strong', 
      icon: '☀️' 
    },
    { 
      period: 'Weekly', 
      title: 'Discord Announcements', 
      description: 'Regular updates and discussions on Discord to keep everyone in the loop', 
      icon: '💬' 
    },
    { 
      period: 'Monthly', 
      title: 'Community Events', 
      description: 'Virtual gatherings, gaming sessions, and special activities to bring us together', 
      icon: '🎮' 
    },
    { 
      period: 'Quarterly', 
      title: 'Business Updates', 
      description: 'Comprehensive reports on progress, plans, and roadmap transparency', 
      icon: '📊' 
    }
  ];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 z-50">
      {/* Subtle parallax background effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white pixel-text">
            Communication Commitments
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed mb-4">
              We believe in transparency, frequent updates, and meaningful community participation.
            </p>
            <p className="text-lg md:text-xl text-purple-200 leading-relaxed">
              Our communication strategy stays true to the <span className="text-yellow-300 font-semibold">Moonrunners ethos</span> while keeping everyone informed and engaged.
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-50"></div>
          
          {commitments.map((item, index) => (
            <div 
              key={item.period} 
              className="relative group"
              style={{ 
                animationDelay: `${index * 200}ms`,
                transform: `translateY(${Math.sin((scrollY + index * 100) * 0.001) * 5}px)`
              }}
            >
              {/* Timeline Item */}
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/60 transition-all duration-300 hover:transform hover:scale-105 relative">
                {/* Icon Circle */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-purple-400/50 group-hover:border-purple-300 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    <span className="text-purple-300">{item.period}:</span> {item.title}
                  </h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-purple-400/30"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-purple-400/30"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-purple-400/30"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-purple-400/30"></div>
              </div>

              {/* Connecting dot for desktop timeline */}
              <div className="hidden lg:block absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 border-2 border-purple-300 rounded-full z-10 group-hover:bg-purple-400 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Conversation 🌙
            </h3>
            <p className="text-purple-200 mb-6">
              Be part of our growing community where transparency meets adventure. 
              Every voice matters in shaping our journey together.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a 
                href="https://discord.gg/moonrunners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/30 hover:border-indigo-300/60 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>💬</span> Join Discord
              </a>
              <a 
                href="https://twitter.com/moonrunners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600/40 hover:bg-blue-600/60 border border-blue-400/30 hover:border-blue-300/60 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>🐦</span> Follow on Twitter
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-purple-600/30 px-3 py-1 rounded-full text-purple-200 border border-purple-400/30">
                #Transparency
              </span>
              <span className="bg-blue-600/30 px-3 py-1 rounded-full text-blue-200 border border-blue-400/30">
                #Community
              </span>
              <span className="bg-yellow-600/30 px-3 py-1 rounded-full text-yellow-200 border border-yellow-400/30">
                #Moonrunners
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunicationSection; 