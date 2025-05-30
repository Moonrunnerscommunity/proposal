export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description?: string;
}

export interface SocialSection {
  title: string;
  links: SocialLink[];
}

// Contact information
export const contactInfo = {
  email: 'communitymoonrunners@gmail.com'
};

// Primary social links from existing components
export const primarySocials: SocialLink[] = [
  {
    name: 'Discord',
    url: 'https://discord.gg/SC3TFQrKwf',
    icon: '💬',
    description: 'Join our community hub with thousands of active members'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/MoonrunnersNFT',
    icon: '🐦',
    description: 'Follow us for announcements and updates (64.7K followers)'
  }
];

// Extended social links (some may be placeholders for future use)
export const extendedSocials: SocialLink[] = [
  ...primarySocials,
  {
    name: 'Instagram',
    url: '#', // Placeholder
    icon: '📸',
    description: 'Visual content and behind-the-scenes'
  },
  {
    name: 'Reddit',
    url: '#', // Placeholder
    icon: '🤖',
    description: 'Community discussions and AMAs'
  }
];

// Footer link sections for organized display
export const footerSections: SocialSection[] = [
  {
    title: 'Connect',
    links: extendedSocials
  },
  {
    title: 'Resources',
    links: [
      { name: 'Lore Library', url: '#', icon: '📚' },
      { name: 'Game Guide', url: '#', icon: '🎮' },
      { name: 'NFT Collection', url: '#', icon: '🖼️' },
      { name: 'Merch Store', url: '#', icon: '👕' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', url: '#', icon: '❓' },
      { name: 'Bug Reports', url: '#', icon: '🐛' },
      { name: 'Feature Requests', url: '#', icon: '💡' },
      { name: 'Contact Us', url: `mailto:${contactInfo.email}`, icon: '📧' }
    ]
  }
];

// Helper functions
export const getDiscordLink = (): string => {
  return primarySocials.find(social => social.name === 'Discord')?.url || '#';
};

export const getTwitterLink = (): string => {
  return primarySocials.find(social => social.name === 'Twitter')?.url || '#';
};

export const getContactEmail = (): string => {
  return contactInfo.email;
};

export const getContactEmailLink = (): string => {
  return `mailto:${contactInfo.email}`;
};

export const getSocialByName = (name: string): SocialLink | undefined => {
  const allSocials = [...extendedSocials, ...footerSections.flatMap(section => section.links)];
  return allSocials.find(social => social.name.toLowerCase() === name.toLowerCase());
}; 