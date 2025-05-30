export interface TeamMember {
  name: string;
  wolfName: string;
  image: string;
  bio: string;
  role: string;
  twitter?: string;
  walletAddress?: string;
  discord?: string;
}

export const packLeadership: TeamMember[] = [
  { 
    name: 'Cartel', 
    wolfName: 'Strategy Wolf',
    image: '/team/cartel.png', 
    bio: 'A seasoned pack leader with over two decades of experience navigating the digital wilderness. This Alpha has guided teams of 40+ wolves through complex technological terrain, successfully launching disruptive innovations that generated over $100M in value. Expert in emerging technologies like AI, Web3, and immersive media, she forges strategic alliances across vast digital territories while building scalable platforms that transform entire ecosystems.',
    role: 'Product & Engineering',
    twitter: 'carteldebt',
    walletAddress: '0x96C38410F41D196a47cBB456C51d0EA2f2Ef9816',
    discord: 'carteldebt'
  },
  { 
    name: 'Kshove', 
    wolfName: 'Operations Wolf',
    image: '/team/ops.svg', 
    bio: 'Our protective, guiding leader who coordinates the whole pack. With years of real-world business experience, they navigate both wilderness and civilization while ensuring smooth execution of all initiatives.',
    role: 'Business & Partnerships',
    twitter: 'kshove_io',
    walletAddress: 'kshove',
    discord: 'kshove'
  }
];

export const wolfCouncil: TeamMember[] = [
  { 
    name: 'Kaladin', 
    wolfName: 'The Lore Keeper',
    image: '/team/lit.svg', 
    bio: 'The original writer of the Moonrunners lore and creator of the Moonrunners universe, Kaladin returns to the pack to bring us new adventures and crazy stories.',
    role: 'Content & Narrative',
    twitter: 'KaladinNFT',
    walletAddress: 'kaladin',
    discord: 'kaladin'
  },
  { 
    name: 'CryptoPicaroon', 
    wolfName: 'The Puzzle Master',
    image: '/team/picaroon.svg', 
    bio: 'Master of mysteries and keeper of secrets. This cunning wolf designs intricate puzzles, hidden challenges, and cryptic riddles that test the wit and wisdom of the pack while guarding our most treasured knowledge.',
    role: 'Puzzle Design',
    twitter: 'captainpicaroon',
    discord: 'captainpicaroon'
  },
  { 
    name: 'Julianne', 
    wolfName: 'The Howler',
    image: '/team/julianne.png', 
    bio: 'The voice of the pack in the digital realm. Leads howls on Twitter, rallies Discord discussions, greets newcomers warmly, and ensures all communications resonate with camaraderie and inclusivity.',
    role: 'Community Relations',
    twitter: 'JM_Sadowski',
    walletAddress: 'julianne',
    discord: 'julianne'
  },
  { 
    name: '612crypto', 
    wolfName: 'Full Stack Wolf',
    image: '/team/612crypto.png', 
    bio: 'A web developer with over 15 years of experience, blending technical expertise with the collaborative spirit of the pack. He ensures that every aspect of the Moonrunners\' web presence is seamless, secure, and ready to scale.',
    role: 'Development Lead',
    twitter: '612crypto_eth',
    walletAddress: '0xf39ceb8ab0de75dca31e988fd59d53cc009803e4',
    discord: '612crypto_eth'
  },
  { 
    name: 'CryptoDave', 
    wolfName: 'The Pack Treasurer',
    image: '/team/fin.svg', 
    bio: 'Keeps the pack\'s resources secure and sustainable. Financial strategist managing treasury, planning economic strategies, and ensuring we have the resources needed for our journey while maintaining transparency.',
    role: 'Financial Planning',
    twitter: 'dave_fin',
    walletAddress: 'davefin',
    discord: 'davefin'
  },
  { 
    name: 'Hodler', 
    wolfName: 'The Pack Strategist',
    image: '/team/hodler.svg', 
    bio: 'Long-term strategist focused on sustainable growth and value creation. This wise wolf thinks several seasons ahead, ensuring the pack\'s decisions today benefit future generations of Moonrunners.',
    role: 'Strategic Advisor',
    twitter: 'HodlerWW'
  },
  { 
    name: 'ExplorerDavid', 
    wolfName: 'The Adventureneer',
    image: '/team/explorerdavid.svg', 
    bio: 'Self-proclaimed "Chief Everything Officer" and creative adventurer who bridges art and technology. This innovative wolf explores the intersection of digital art and continuum mechanics, bringing fresh perspectives and boundless curiosity to every project.',
    role: 'Creative Innovation',
    twitter: 'ExplorerDavid',
  },
  { 
    name: 'DedicatedDad.eth', 
    wolfName: 'The Shadow Guardian',
    image: '/team/dedicateddad.svg', 
    bio: 'A veteran pack member who\'s been guarding the shadows for years. This security-minded wolf stays "in the weeds" to protect against hackers and social engineering attacks. Supports Discord infrastructure while remaining deliberately invisible to threats.',
    role: 'Security & Discord Ops',
    walletAddress: 'dedicateddad.eth',
    discord: 'dedicateddad.eth'
  }
];

// Helper function to find a team member by name
export const findTeamMember = (name: string): TeamMember | undefined => {
  const allMembers = [...packLeadership, ...wolfCouncil];
  return allMembers.find(member => member.name.toLowerCase() === name.toLowerCase());
};

// Multisig signers - extract from team data
export const multisigSigners = packLeadership.filter(member => member.walletAddress?.startsWith('0x')); 