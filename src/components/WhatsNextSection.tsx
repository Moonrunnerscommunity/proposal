'use client';

import React from 'react';

const WhatsNextSection = () => {
  // Temporarily disable scroll listener to test scroll stopping issue
  // const [scrollY, setScrollY] = useState(0);
  
  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const scrollY = 0; // Temporary static value

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
            What&apos;s Next
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-2xl text-purple-200 leading-relaxed mb-8">
              The future of Moonrunners holds many exciting possibilities. While we have numerous ideas 
              for expanding and enhancing the project, we&apos;re committed to moving forward thoughtfully 
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
              Timeline ⏰✨
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg text-purple-200">
                Our <em>very loose</em> roadmap to bringing the Moonrunners vision to life. 🚀
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-yellow-200">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl mr-2">⚠️</span>
                  <span className="font-semibold">Heads Up!</span>
                  <span className="text-2xl ml-2">⚠️</span>
                </div>
                <p className="text-sm leading-relaxed">
                  We&apos;re still figuring a lot of this out! 🤔 This timeline represents our general attack plan, 
                  but things <strong>will definitely change</strong> as we learn and adapt. 
                  Consider this more of a &quot;vibe check&quot; than a concrete commitment. 😅
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-purple-300">
                <span>🎯</span>
                <span>Roadmap will be solidified in the first 90 days</span>
                <span>🎯</span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Visual indicator line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-cyan-500/30"></div>
            
            {/* 90 Days - Solid planning */}
            <div className="relative group">
              <div className="absolute left-6 top-8 w-5 h-5 bg-purple-500 rounded-full border-4 border-white/20 animate-pulse"></div>
              <div className="ml-16 bg-black/30 backdrop-blur-sm border-2 border-purple-500/40 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20 relative">
                      First 90 Days 🎯
                      <div className="absolute -top-2 -right-2 text-lg">✨</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed mb-2">
                      <strong>Solidify the plan!</strong> 📋 Engage community, stabilize expectations, relaunch lore, 
                      reboot social media, beta test video game (if feasible). 🎮
                    </p>
                    <div className="text-xs text-purple-300 flex items-center">
                      <span className="mr-2">━━━</span>
                      <span>Solid planning phase</span>
                      <span className="ml-2">━━━</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transition indicator */}
            <div className="flex items-center justify-center my-8">
              <div className="flex items-center space-x-4 text-purple-300 bg-black/20 rounded-full px-6 py-3 border border-purple-500/30">
                <span className="text-sm">━━━</span>
                <span className="text-xs">ROADMAP SOLIDIFIES</span>
                <span className="text-sm">┅┅┅</span>
              </div>
            </div>

            {/* 6 Months - More flexible */}
            <div className="relative group">
              <div className="absolute left-6 top-8 w-5 h-5 bg-blue-500/70 rounded-full border-4 border-white/10"></div>
              <div className="ml-16 bg-black/20 backdrop-blur-sm border border-blue-500/30 border-dashed rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20 relative">
                      First 6 Months 🤞
                      <div className="absolute -top-2 -right-2 text-lg">💭</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed mb-2">
                      <em>Probably:</em> Reboot web properties, NFT.NYC event 🏙️, merch store launch 👕, 
                      complete novel draft 📖, research toys/games 🧸, market aggressively 📢, 
                      possible video game release? 🎮✨
                    </p>
                    <div className="text-xs text-blue-300 flex items-center">
                      <span className="mr-2">┅┅┅</span>
                      <span>Flexible timeline (things might shift!)</span>
                      <span className="ml-2">┅┅┅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 12 Months - Very flexible */}
            <div className="relative group">
              <div className="absolute left-6 top-8 w-5 h-5 bg-cyan-500/50 rounded-full border-4 border-white/10"></div>
              <div className="ml-16 bg-black/20 backdrop-blur-sm border border-cyan-500/30 border-dashed rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-600 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white/20 relative">
                      First 12 Months 🌙
                      <div className="absolute -top-2 -right-2 text-lg">🤷‍♂️</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 leading-relaxed mb-2">
                      <em>Maybe:</em> Host DragonCon event 🐉, release novel 📚, launch toys for holidays 🎁, 
                      develop tabletop game 🎲, explore audiobook production (like Soundbooth Theater!) 🎧✨
                    </p>
                    <div className="text-xs text-cyan-300 flex items-center">
                      <span className="mr-2">┅┅┅</span>
                      <span>Very flexible (who knows what we&apos;ll discover!)</span>
                      <span className="ml-2">┅┅┅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future beyond */}
            <div className="text-center mt-8">
              <div className="text-purple-300/60 text-sm space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span>✨</span>
                  <span>Beyond that... the sky&apos;s the limit!</span>
                  <span>🚀</span>
                </div>
                <div className="text-xs">
                  (We&apos;ll figure it out as we go! 😊)
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