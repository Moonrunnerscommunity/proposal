export interface TeamMember {
  name: string;
  wolfName: string;
  image: string;
  animatedImage?: string; // Optional animated gif for easter egg
  bio: string;
  role: string;
  twitter?: string;
  walletAddress?: string;
  discord?: string;
  prompt?: string; // Optional prompt for AI or image generation
}

/*

Hey there!

I'm sending this message to everyone on the team.

Below you will find a paste of your team member data and your animated wolf. Please feel free to make any changes and send it back, or let me know if you have any questions or want me to change anything for you. Much of this content was AI generated so it could be totally wrong, don't feel obligated to keep it.

You don't have to include everything if you don't want to.

The prompt is what I used to generate the animated image. It is not an exact science, but if you want to try a different prompt I'm happy to feed the machine but it might take a couple of days.

*/

export const packLeadership: TeamMember[] = [
  {
    name: 'Cartel',
    wolfName: 'Strategy Wolf',
    image: '/team/cartel.png',
    animatedImage: '/team/live/cartel.gif',
    bio: 'A seasoned pack leader with over two decades of experience navigating the digital wilderness. This Alpha has guided teams of 40+ wolves through complex technological terrain, successfully launching disruptive innovations that generated over $100M in value. Expert in emerging technologies like AI, Web3, and immersive media, she forges strategic alliances across vast digital territories while building scalable platforms that transform entire ecosystems.',
    role: 'Product & Engineering',
    twitter: 'carteldebt',
    walletAddress: '0x96C38410F41D196a47cBB456C51d0EA2f2Ef9816',
    discord: 'carteldebt',
    prompt: 'a wolf making a really threatening face and letting you know they\'re in the cartel and you shouldn\'t mess with them'
  },
];

export const wolfCouncil: TeamMember[] = [
  {
    name: 'Kshove',
    wolfName: 'Operations Wolf',
    image: '/team/kshove.png',
    animatedImage: '/team/live/kshove.gif',
    bio: 'A builder and operator with over 5 years of experience growing and operating a successful family business, plus a six-figure exit from a DJ company he started in high school. This pragmatic visionary has capitalized on multiple trends including the sneaker and trading card markets, and now focuses heavily on equities investing with strong returns. A jack-of-all-trades with deep roots in Moonrunners, he\'s focused on rebuilding the brand with sustainable Web2 cashflows and long-term community upside, ready to support every role and volunteer effort needed to protect and grow the pack.',
    role: 'Business & Partnerships',
    twitter: 'kshove_',
    discord: 'kshove',
    prompt: 'a wolf who\'s really happy to see you and wants to get this party started and really loves the music that\'s playing right now'
  },
  {
    name: 'Kaladin', 
    wolfName: 'The Lore Keeper',
    image: '/team/kaladin.png', 
    animatedImage: '/team/live/kaladin.gif',
    bio: 'One of the original writers of the Moonrunners lore and a loud-mouthed wolf who loves to vibe, Kaladin returns to expand the universe into new and unexpected directions. He also wrote a real life book.',
    role: 'Content & Narrative',
    twitter: 'KaladinNFT',
    // walletAddress: '',
    // discord: '',
    prompt: 'a wolf who slowly reaches up and scratches his eye with his middle finger and you both know he\'s flipping you off because he\'s not being very subtle about it'
  },
  { 
    name: 'CryptoPicaroon', 
    wolfName: 'The Puzzle Master',
    image: '/team/picaroon.png', 
    animatedImage: '/team/live/picaroon.gif',
    bio: 'Master of mysteries and keeper of secrets. This cunning wolf designs intricate puzzles, hidden challenges, and cryptic riddles that test the wit and wisdom of the pack while guarding our most treasured knowledge.',
    role: 'Puzzle Design',
    twitter: 'captainpicaroon',
    // walletAddress: '',
    discord: 'CryptoPicaroon',
    prompt: 'a wolf who raises his hands from out of frame and he\'s holding a bunch of ancient runes and glyphs and scrolls and he\'s suddenly puzzling them out like indiana jones'
  },
  { 
    name: 'Julianne', 
    wolfName: 'The Howler',
    image: '/team/julianne.png', 
    animatedImage: '/team/live/julianne.gif',
    bio: 'The voice of the pack in the digital realm. Leads howls on Twitter, rallies Discord discussions, greets newcomers warmly, and ensures all communications resonate with camaraderie and inclusivity.',
    role: 'Community Relations',
    twitter: 'JM_Sadowski',
    // walletAddress: '',
    // discord: '',
    prompt: 'a happy wolf whose pet frog prince suddenly leaps off of their head'
  },
  { 
    name: '612crypto', 
    wolfName: 'Full Stack Wolf',
    image: '/team/612crypto.png', 
    animatedImage: '/team/live/612.gif',
    bio: 'A web developer with over 15 years of experience, blending technical expertise with the collaborative spirit of the pack. He ensures that every aspect of the Moonrunners\' web presence is seamless, secure, and ready to scale.',
    role: 'Development Lead',
    twitter: '612crypto_eth',
    walletAddress: '0xf39ceb8ab0de75dca31e988fd59d53cc009803e4',
    discord: '612crypto_eth',
    prompt: 'a wolf who lifts up a comically large stack of pancakes'
  },
  { 
    name: 'CryptoDave', 
    wolfName: 'The Pack Treasurer',
    image: '/team/cryptodave.png', 
    animatedImage: '/team/live/cryptodave.gif',
    bio: 'Keeps the pack\'s resources secure and sustainable. Financial strategist managing treasury, planning economic strategies, and ensuring we have the resources needed for our journey while maintaining transparency.',
    role: 'Financial Planning',
    twitter: '0xcryptodave',
    // walletAddress: '',
    // discord: '',
    prompt: 'a beautiful mind wolf who starts pinning charts and graphs to the walls around him while money rains down everywhere he touches'
  },
  { 
    name: 'Hodler', 
    wolfName: 'The Pack Strategist',
    image: '/team/hodler.png', 
    animatedImage: '/team/live/hodler.gif',
    bio: 'Long-term strategist focused on sustainable growth and value creation. This wise wolf thinks several seasons ahead, ensuring the pack\'s decisions today benefit future generations of Moonrunners.',
    role: 'Strategic Advisor',
    twitter: 'HodlerWW',
    prompt: 'a wolf who throws his head back and howls as the moon rises behind him'
  },
  { 
    name: 'ExplorerDavid', 
    wolfName: 'The Adventureneer',
    image: '/team/explorer.png', 
    bio: 'Self-proclaimed "Chief Everything Officer" and creative adventurer who bridges art and technology. This innovative wolf explores the intersection of digital art and continuum mechanics, bringing fresh perspectives and boundless curiosity to every project.',
    role: 'Creative Innovation',
    animatedImage: '/team/live/explorer.gif',
    twitter: 'ExplorerDavid',
    // walletAddress: '',
    // discord: '',
    prompt: 'a wolf who starts to pant and whip his tail around and his tail is colored in colorful paint and it covers the wall behind him in a beautiful abstract painting in primary colors'
  },
  { 
    name: 'DedicatedDad.eth', 
    wolfName: 'The Shadow Guardian',
    image: '/team/dedicateddad.png', 
    animatedImage: '/team/live/dedicateddad.gif',
    bio: 'A veteran pack member who\'s been guarding the shadows for years. This security-minded wolf stays "in the weeds" to protect against hackers and social engineering attacks. Supports Discord infrastructure while remaining deliberately invisible to threats.',
    role: 'Security & Discord Ops',
    walletAddress: 'dedicateddad.eth',
    discord: 'dedicateddad.eth',
    prompt: 'super stealth expert camouflage wolf blends into his background without you even noticing'
  }
];

// Helper function to find a team member by name
export const findTeamMember = (name: string): TeamMember | undefined => {
  const allMembers = [...packLeadership, ...wolfCouncil];
  return allMembers.find(member => member.name.toLowerCase() === name.toLowerCase());
};

// Multisig signers - extract from team data
export const multisigSigners = packLeadership.filter(member => member.walletAddress?.startsWith('0x')); 