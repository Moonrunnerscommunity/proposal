'use client';

import React, { useState, useRef, useEffect } from 'react';
import { footerSections, getDiscordLink, getTwitterLink } from '@/config/socialData';

const ThatsAllFolksSection = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const easterEggRef = useRef<HTMLDivElement>(null);

  const funFacts = [
    "You made it to the end! 🎉",
    "Thanks for not scrolling too fast! ⚡",
    "You're officially a scroll champion! 🏆",
    "That was quite the journey! 🗺️"
  ];

  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  const handleHeartClick = () => {
    setShowEasterEgg(!showEasterEgg);
  };

  // Auto-scroll to easter egg when it appears
  useEffect(() => {
    if (showEasterEgg && easterEggRef.current) {
      // Small delay to let the initial animation start, then scroll
      setTimeout(() => {
        easterEggRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 200);
    }
  }, [showEasterEgg]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 z-50">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 pixel-text">
              🎬 That&apos;s All Folks! 🎭
            </h2>
            <div className="text-2xl mb-4">
              <span className="animate-bounce inline-block">🌙</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>✨</span>
              <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>🚀</span>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
            <div className="relative z-10 space-y-6">
              <p className="text-xl md:text-2xl text-purple-200 leading-relaxed">
                Well, well, well... {randomFact} 👨‍👩‍👧‍👦
              </p>
              <p className="text-lg text-purple-300 leading-relaxed">
                You&apos;ve witnessed our entire master plan unfold like a beautiful digital scroll. 
                From team introductions to operational wizardry to grand future schemes - 
                you&apos;ve seen it all! 🎪
              </p>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-200 text-lg">
                  <span className="text-2xl mr-2">🎉</span>
                  <strong>Plot Twist:</strong> This isn&apos;t really the end - it&apos;s just the beginning! 
                  We&apos;re building something epic together, and you&apos;re now part of the story. 📖✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:animate-spin">🎯</div>
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-purple-300">Reading Completion</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:animate-pulse">⚡</div>
            <div className="text-2xl font-bold text-white mb-2">∞</div>
            <div className="text-blue-300">Adventure Level</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:animate-bounce">🚀</div>
            <div className="text-2xl font-bold text-white mb-2">999+</div>
            <div className="text-cyan-300">Hype Points Earned</div>
          </div>
        </div>

        {/* Links Introduction */}
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-purple-200 leading-relaxed">
            Look at all these awesome links we&apos;re planning to make work soon! 🔗✨
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📍</span>
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url !== '#' ? '_blank' : '_self'}
                    rel={link.url !== '#' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 text-purple-300 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-lg group-hover:animate-pulse">{link.icon}</span>
                    <span className={`group-hover:translate-x-1 transition-transform duration-200 ${link.url === '#' ? 'line-through opacity-60' : ''}`}>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final Call to Action */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl p-8 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-cyan-600/5"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ready to Join the Adventure? 🌟
              </h3>
              <p className="text-lg text-purple-200 mb-8 leading-relaxed">
                Don&apos;t just lurk in the shadows! Jump into our Discord, follow our socials, 
                and become part of the Moonrunners community. We promise it&apos;ll be fun! 😄
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getDiscordLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 border-2 border-white/20"
                >
                  🚀 Join Discord
                </a>
                <a
                  href={getTwitterLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 border-2 border-white/20"
                >
                  📸 Follow on Social
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Final Flourish */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4 text-purple-300 text-sm">
            <span>Made with</span>
            <button
              onClick={handleHeartClick}
              className="text-red-400 animate-pulse hover:scale-110 transition-transform duration-200 cursor-crosshair focus:outline-none focus:ring-2 focus:ring-red-400/50 rounded"
            >
              ❤️
            </button>
            <span>by the Moonrunners Community Team</span>
          </div>
          
          <div className="text-purple-400 text-sm space-y-2">
            <div>© 2025 Moonrunners Community. All rights reserved.</div>
          </div>

          {/* Hidden Easter Egg - Only shows when heart is clicked */}
          {showEasterEgg && (
            <div 
              ref={easterEggRef}
              className="mt-8 text-xs text-purple-500/60 animate-in slide-in-from-bottom-4 duration-700"
            >
              {/* MEGA CONFETTI EXPLOSION */}
              <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {/* First wave of confetti */}
                <div className="absolute top-1/2 left-1/4 animate-in zoom-in duration-300 delay-100">
                  <div className="flex space-x-1 animate-pulse">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>🎊</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '100ms' }}>✨</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '200ms' }}>🎉</span>
                  </div>
                </div>
                
                {/* Second wave */}
                <div className="absolute top-1/3 right-1/4 animate-in zoom-in duration-400 delay-300">
                  <div className="flex space-x-1">
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '50ms' }}>🌟</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '150ms' }}>💫</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '250ms' }}>⭐</span>
                  </div>
                </div>
                
                {/* Third wave */}
                <div className="absolute bottom-1/3 left-1/3 animate-in zoom-in duration-500 delay-500">
                  <div className="flex space-x-1">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '100ms' }}>🎆</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>🎇</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '300ms' }}>✨</span>
                  </div>
                </div>
                
                {/* Fourth wave */}
                <div className="absolute top-1/4 right-1/3 animate-in zoom-in duration-300 delay-700">
                  <div className="flex space-x-1">
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '0ms' }}>🎊</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '100ms' }}>🌈</span>
                    <span className="text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>⚡</span>
                  </div>
                </div>
              </div>

              {/* Celebration burst effect - Enhanced! */}
              <div className="relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 animate-in zoom-in duration-300 delay-200">
                  <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms', animation: 'bounce 0.5s infinite, pulse 2s infinite' }}>🎊</span>
                  <span className="text-2xl animate-bounce" style={{ animationDelay: '100ms', animation: 'bounce 0.5s infinite, pulse 2s infinite 0.5s' }}>✨</span>
                  <span className="text-3xl animate-bounce" style={{ animationDelay: '200ms', animation: 'bounce 0.5s infinite, pulse 2s infinite 1s' }}>🎉</span>
                  <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms', animation: 'bounce 0.5s infinite, pulse 2s infinite 1.5s' }}>⭐</span>
                  <span className="text-2xl animate-bounce" style={{ animationDelay: '400ms', animation: 'bounce 0.5s infinite, pulse 2s infinite 2s' }}>🎊</span>
                </div>
              </div>
              
              {/* SCREEN SHAKE CONTAINER */}
              <div className="animate-in zoom-in duration-500 delay-200" style={{ animation: 'shake 0.5s ease-in-out 0.2s, zoom-in 0.5s ease-out 0.2s' }}>
                
                {/* Main easter egg text with MEGA staggered animation */}
                <div className="space-y-4">
                  <div className="animate-in zoom-in duration-700 delay-300" style={{ animation: 'zoom-in 0.7s ease-out 0.3s, pulse 3s infinite 1s' }}>
                    <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/30 via-yellow-400/30 via-green-500/30 via-blue-500/30 to-purple-600/30 border-2 border-purple-400/50 rounded-xl p-6 mb-6 relative overflow-hidden animate-pulse">
                      {/* Rainbow background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 via-indigo-500/20 to-purple-500/20 animate-pulse"></div>
                      
                      <div className="relative z-10">
                        <div className="text-lg font-bold text-purple-200 mb-3 animate-bounce">
                          <span className="text-3xl mr-2">🏆</span>
                          SECRET ACHIEVEMENT UNLOCKED!
                          <span className="text-3xl ml-2">🏆</span>
                        </div>
                        <div className="text-xl text-yellow-200 font-bold animate-pulse">
                          🎉 LEGENDARY EASTER EGG DISCOVERER! 🎉
                        </div>
                        <div className="text-lg text-purple-200 font-medium mt-2">
                          You found the ultimate hidden treasure!
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fireworks text effect */}
                  <div className="animate-in slide-in-from-left duration-700 delay-600">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40">
                      <div className="text-lg text-orange-200 italic font-medium">
                        <span className="text-2xl mr-2 animate-spin">🎆</span>
                        Pro tip: The real treasure was the friends we made along the way...
                        <span className="text-2xl ml-2 animate-spin" style={{ animationDirection: 'reverse' }}>🎆</span>
                      </div>
                      <div className="text-yellow-300 font-bold text-xl mt-2 animate-pulse">💎 PURE GOLD! 💎</div>
                    </div>
                  </div>
                  
                  {/* MASSIVE END SCENE with fireworks */}
                  <div className="animate-in slide-in-from-right duration-700 delay-900">
                    <div className="text-center p-6 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-xl border-2 border-blue-400/50">
                      <div className="flex justify-center items-center space-x-3 mb-3">
                        <span className="text-3xl animate-pulse text-yellow-400" style={{ animationDelay: '0ms' }}>⭐</span>
                        <span className="text-2xl animate-bounce text-red-400">🎊</span>
                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse">
                          ~ EPIC END SCENE ~
                        </span>
                        <span className="text-2xl animate-bounce text-red-400" style={{ animationDelay: '0.2s' }}>🎊</span>
                        <span className="text-3xl animate-pulse text-yellow-400" style={{ animationDelay: '0.4s' }}>⭐</span>
                      </div>
                      
                      {/* Fireworks row */}
                      <div className="flex justify-center space-x-2 mb-3">
                        <span className="text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🎆</span>
                        <span className="text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>🎇</span>
                        <span className="text-2xl animate-bounce" style={{ animationDelay: '400ms' }}>🎆</span>
                        <span className="text-2xl animate-bounce" style={{ animationDelay: '600ms' }}>🎇</span>
                        <span className="text-2xl animate-bounce" style={{ animationDelay: '800ms' }}>🎆</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* ULTIMATE CELEBRATION MESSAGE */}
                  <div className="animate-in fade-in duration-1000 delay-1200">
                    <div className="text-center p-6 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 rounded-xl border border-green-400/50">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-3 animate-pulse">
                        🌟 CONGRATULATIONS, CHAMPION! 🌟
                      </div>
                      <div className="text-lg text-green-200 mb-2">
                        You are now officially part of the Moonrunners Hall of Fame!
                      </div>
                      <div className="flex justify-center space-x-1 mt-3">
                        <span className="text-sm text-purple-400 animate-pulse" style={{ animationDelay: '0ms' }}>✨</span>
                        <span className="text-lg text-purple-300 font-bold">Thanks for being absolutely LEGENDARY!</span>
                        <span className="text-sm text-purple-400 animate-pulse" style={{ animationDelay: '500ms' }}>✨</span>
                      </div>
                      
                      {/* Final rainbow explosion */}
                      <div className="flex justify-center space-x-1 mt-4">
                        <span className="text-lg animate-bounce" style={{ animationDelay: '0ms' }}>🌈</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '100ms' }}>🎊</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '200ms' }}>✨</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '300ms' }}>🎉</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '400ms' }}>⚡</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '500ms' }}>🎆</span>
                        <span className="text-lg animate-bounce" style={{ animationDelay: '600ms' }}>🌟</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <style jsx>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                  20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ThatsAllFolksSection; 