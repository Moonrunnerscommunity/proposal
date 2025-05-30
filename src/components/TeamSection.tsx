'use client';

import Image from 'next/image';
import { TeamMember, packLeadership, wolfCouncil } from '../config/teamData';

const TeamMemberCard = ({ name, wolfName, image, bio, role, twitter, walletAddress, discord }: TeamMember) => {
  // Disable animations temporarily to test parallax
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  // Auto-generate OpenSea and Etherscan URLs from wallet address
  const openSeaUrl = walletAddress ? `https://opensea.io/${walletAddress}` : undefined;
  const etherscanUrl = walletAddress ? `https://etherscan.io/address/${walletAddress}` : undefined;

  return (
    <div className="team-member-card glass p-6 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="relative w-48 h-48 mx-auto mb-4">
        <Image
          src={image}
          alt={`${name} NFT`}
          fill
          className="pixelated-image object-cover rounded-lg border-2 border-purple-400/30"
          unoptimized
        />
      </div>
      <h4 className="text-lg font-bold text-white text-center mb-1">{wolfName}</h4>
      <p className="text-xl font-bold !text-yellow-400 text-center mb-1">{name}</p>
      <p className="text-sm !text-white font-semibold text-center mb-3">{role}</p>
      <p className="text-sm text-gray-300 text-center leading-relaxed mb-4">{bio}</p>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-3 mt-4">
        {twitter && (
          <a 
            href={`https://twitter.com/${twitter}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title={`@${twitter} on Twitter`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        )}
        {openSeaUrl && (
          <a 
            href={openSeaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
            title="OpenSea Profile"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 01.187.014c.52 1.169.972 2.623.76 3.528-.088.372-.335.876-.614 1.342a2.405 2.405 0 01-.117.199.106.106 0 01-.09.051H6.013a.106.106 0 01-.093-.169zm13.914 1.68a.109.109 0 01-.065.101c-.243.103-1.07.485-1.414.962-.878 1.222-1.548 2.97-3.048 2.97H9.053a4.019 4.019 0 01-4.013-4.028v-.072c0-.058.048-.106.106-.106h3.485c.067 0 .118.058.112.125-.031.435.069.745.213.909.144.164.356.220.669.220.313 0 .549-.085.709-.304.160-.219.242-.615.242-1.075v-.341h-1.761a.107.107 0 01-.106-.106v-.688c0-.058.048-.106.106-.106h1.761v-1.643h1.222v1.643h.674c.058 0 .106.048.106.106v.688a.107.107 0 01-.106.106h-.674v.341c0 .196.016.357.096.640.069.283.212.458.413.458s.344-.175.413-.458c.08-.283.096-.444.096-.64v-.341h-.554a.107.107 0 01-.106-.106v-.688c0-.058.048-.106.106-.106h.554v-.851c0-.058.048-.106.106-.106h.727c.058 0 .106.048.106.106v.851h.727c.058 0 .106.048.106.106v.688a.107.107 0 01-.106.106h-.727v.341c0 .435.082.831.242 1.075.16.219.396.304.709.304.313 0 .525-.056.669-.22.144-.164.244-.474.213-.909a.112.112 0 01.112-.125h3.485c.058 0 .106.048.106.106v.072c0 .8-.244 1.536-.65 2.152z"/>
            </svg>
          </a>
        )}
        {etherscanUrl && (
          <a 
            href={etherscanUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors"
            title="View on Etherscan"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </a>
        )}
        {discord && (
          <div className="flex items-center text-purple-400 hover:text-purple-300 transition-colors" title={`Discord: ${discord}`}>
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-xs font-semibold">@{discord}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TeamSection() {
  // Disable animations temporarily to test parallax
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  return (
    <section className="team-section relative min-h-screen py-16 sm:py-20 lg:py-24">
      {/* No background overlay - let parallax show through completely */}
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-12 transition-all duration-1000">
          <h2 className="text-responsive-3xl font-bold text-white mb-6">
            🐺 Wolves of Many Talents 🌙
          </h2>
          <div className="glass p-6 sm:p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-200 leading-relaxed mb-4">
              Think of our team as <span className="text-gradient font-semibold">Wolf Council 2.0</span>, with each member having a special role to play in protecting and providing for the pack. 
              We&apos;re keeping things agile - a small band of dedicated Moonrunners rather than a big corporate crew - so <strong className="text-white">every role counts</strong>.
            </p>
          </div>
        </div>

        {/* Pack Leadership */}
        <div className="mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 delay-300">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">👑</span>
              Pack Leadership
              <span className="text-3xl">👑</span>
            </h3>
            <p className="text-lg text-purple-300 font-semibold">The Alpha Wolves leading the charge to protect and guide the pack</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {packLeadership.map((member, index) => (
              <div key={member.name} style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Wolf Council */}
        <div className="mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 delay-600">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">⚡</span>
              The Wolf Council
              <span className="text-3xl">⚡</span>
            </h3>
            <p className="text-lg text-purple-300 font-semibold">Specialized wolves making the magic happen</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {wolfCouncil.map((member, index) => (
              <div key={member.name} style={{ animationDelay: `${0.9 + index * 0.1}s` }}>
                <TeamMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Pack Support Section */}
        <div className="transition-all duration-1000 delay-1000">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">🤝</span>
              The Pack Support
              <span className="text-3xl">🤝</span>
            </h3>
          </div>
          
          <div className="glass p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Beyond the core team, we know many of you will chip in however you can - and we welcome it! 
              We&apos;ll set up a <span className="text-gradient font-semibold">&quot;Pack Support Squad&quot;</span> - a group of reliable community volunteers who can take on small tasks.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🛡️</span>
                <span>Volunteer Moderators</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🎨</span>
                <span>Fan Artists</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">😂</span>
                <span>Meme Lords</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🎉</span>
                <span>Event Organizers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">📝</span>
                <span>Content Contributors</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🏆</span>
                <span>Tournament Referees</span>
              </div>
            </div>
            
            <p className="text-base text-purple-300 mt-6 italic text-center">
              &quot;The pack thrives only when every member&apos;s contribution is valued.&quot;
            </p>
          </div>
        </div>

      </div>

    </section>
  );
} 