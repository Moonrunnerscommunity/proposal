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
    bio: 'A seasoned pack leader with tons of experience in technology and product development. Expert in AI, Web3, and immersive media, she builds scalable platforms and forges strategic alliances across the digital wilderness.',
    role: 'Product & Engineering',
    twitter: 'carteldebt',
    walletAddress: '0x96C38410F41D196a47cBB456C51d0EA2f2Ef9816',
    discord: 'carteldebt',
    prompt: 'a wolf making a really threatening face and letting you know they\'re in the cartel and you shouldn\'t mess with them'
  },
  {
    name: 'Kaladin',
    wolfName: 'Creative Wolf',
    image: '/team/kaladin.png',
    animatedImage: '/team/live/kaladin.gif',
    bio: 'One of the original writers of the Moonrunners lore and a loud-mouthed wolf who loves to vibe, Kaladin returns to expand the universe into new and unexpected directions. He also wrote a real life book.',
    role: 'Story & World Building',
    twitter: 'KaladinNFT',
    prompt: 'a wolf who slowly reaches up and scratches his eye with his middle finger and you both know he\'s flipping you off because he\'s not being very subtle about it'
  },
];

export const wolfCouncil: TeamMember[] = [
  {
    name: 'Julianne',
    wolfName: 'The Howler',
    image: '/team/julianne.png',
    animatedImage: '/team/live/julianne.gif',
    bio: 'The voice of the pack in the digital realm. Leads howls on Twitter, rallies Discord discussions, greets newcomers warmly, and ensures all communications resonate with camaraderie and inclusivity.',
    role: 'Community Relations',
    twitter: 'JM_Sadowski',
    prompt: 'a happy wolf whose pet frog prince suddenly leaps off of their head'
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
    name: 'CryptoDave',
    wolfName: 'The Pack Treasurer',
    image: '/team/cryptodave.png',
    animatedImage: '/team/live/cryptodave.gif',
    bio: 'Keeps the pack\'s resources secure and sustainable. Financial strategist managing treasury, planning economic strategies, and ensuring we have the resources needed for our journey while maintaining transparency.',
    role: 'Financial Planning',
    twitter: '0xcryptodave',
    prompt: 'a beautiful mind wolf who starts pinning charts and graphs to the walls around him while money rains down everywhere he touches'
  },
  {
    name: 'ExplorerDavid',
    wolfName: 'The Adventureneer',
    image: '/team/explorer.png',
    animatedImage: '/team/live/explorer.gif',
    bio: 'Self-proclaimed "Chief Everything Officer" and creative adventurer who bridges art and technology. This innovative wolf explores the intersection of digital art and continuum mechanics, bringing fresh perspectives and boundless curiosity to every project.',
    role: 'Creative Innovation',
    twitter: 'ExplorerDavid',
    prompt: 'a wolf who starts to pant and whip his tail around and his tail is colored in colorful paint and it covers the wall behind him in a beautiful abstract painting in primary colors'
  },
  {
    name: 'Kshove',
    wolfName: 'Operations Wolf',
    image: '/team/kshove.png',
    animatedImage: '/team/live/kshove.gif',
    bio: 'A builder and operator with deep roots in Moonrunners. This pragmatic wolf brings experience from running a family business and a successful DJ company exit, now focused on rebuilding the brand with sustainable cashflows and long-term community upside.',
    role: 'Business & Partnerships',
    twitter: 'kshove_',
    discord: 'kshove',
    prompt: 'a wolf who\'s really happy to see you and wants to get this party started and really loves the music that\'s playing right now'
  },
  {
    name: 'CryptoPicaroon',
    wolfName: 'The Puzzle Master',
    image: '/team/picaroon.png',
    animatedImage: '/team/live/picaroon.gif',
    bio: 'Master of mysteries and keeper of secrets. This cunning wolf designs intricate puzzles, hidden challenges, and cryptic riddles that test the wit and wisdom of the pack while guarding our most treasured knowledge.',
    role: 'Puzzle Design',
    twitter: 'captainpicaroon',
    discord: 'CryptoPicaroon',
    prompt: 'a wolf who raises his hands from out of frame and he\'s holding a bunch of ancient runes and glyphs and scrolls and he\'s suddenly puzzling them out like indiana jones'
  },
];

// Helper function to find a team member by name
export const findTeamMember = (name: string): TeamMember | undefined => {
  const allMembers = [...packLeadership, ...wolfCouncil];
  return allMembers.find(member => member.name.toLowerCase() === name.toLowerCase());
};

// Multisig signers - extract from team data
export const multisigSigners = packLeadership.filter(member => member.walletAddress?.startsWith('0x')); 