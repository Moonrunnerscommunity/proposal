export interface ContractInfo {
  name: string; // Name or label for the contract (not always a collection)
  description?: string;
  items?: number;
  currentOwner?: string;
  contractAddress: string;
  transferred?: boolean;
  notIncluded?: boolean;
  imageUrl?: string;
  openseaUrl?: string;
  [key: string]: unknown; // Allow for future extensibility, but avoid 'any'
}

export const contracts: ContractInfo[] = [
  {
    name: 'Moonrunners',
    description: 'Original collection of 10,000 unique Moonrunners NFTs with moon-based mechanics',
    items: 9997,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0x1485297e942ce64e0870ece60179dfda34b4c625',
    transferred: true,
    imageUrl: '/collections/moonrunners.png',
    openseaUrl: 'https://opensea.io/collection/moonrunnersnft'
  },
  {
    name: 'Dragonhorde',
    description: 'Arcane Dragons resurrected in the Alchemy Lab from Primordia\'s ancient past',
    items: 2311,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0x6b5483b55b362697000d8774d8ea9c4429B261BB',
    transferred: true,
    imageUrl: '/collections/dragonhorde.png',
    openseaUrl: 'https://opensea.io/collection/moonrunners-dragonhorde-official'
  },
  {
    name: 'Moonrunners/Dragonhorde Staking Contract (Trophies)',
    description: 'Staking contract for Moonrunners and Dragonhorde NFTs',
    items: 0,
    currentOwner: 'Antix.eth',
    contractAddress: '0x717c6dd66be92e979001aee2ee169aaa8d6d4361',
    transferred: false,
    imageUrl: '/collections/dragonhorde.png',
    openseaUrl: ''
  },
  {
    name: 'Secrets of Primordia',
    description: 'Weapons and artifacts with dual utility - burn for blood or reroll Dragonhorde',
    items: 12800,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0xb6d460ac51b93bca63b694f099c4a8b3b1cf73b4',
    transferred: true,
    imageUrl: '/collections/secrets.gif',
    openseaUrl: 'https://opensea.io/collection/moonrunners-secrets-of-primordia'
  },
  {
    name: 'WeaponToBlood',
    description: 'Contract for converting weapons to blood tokens',
    items: 0,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0x57b2a85cbea7d5902edb94b8bed4b6b1025f210b',
    transferred: true,
    imageUrl: '/nft-weapons.svg',
    openseaUrl: ''
  },
  {
    name: 'WeaponBurn',
    description: 'Contract for burning weapons',
    items: 0,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0xa492583f6fe2fbcd21797d0c2904f7249ced79f8',
    transferred: true,
    imageUrl: '/nft-weapons.svg',
    openseaUrl: ''
  },
  {
    name: 'History of Primordia',
    description: 'Lore and storytelling NFTs documenting the ancient tales and chronicles of Primordia',
    items: 233,
    currentOwner: 'Antix.eth',
    contractAddress: '0x4fdF87d4Edae3Fe323b8F6dF502CCac6c8B4ba28',
    transferred: false,
    imageUrl: '/collections/history.gif',
    openseaUrl: 'https://opensea.io/collection/moonrunners-history-of-primordia'
  },
  {
    name: 'Chronicles of Nogard',
    description: 'Chronicles collection featuring the stories and lore of Nogard',
    items: 0,
    currentOwner: '0xf728942638942DF1a31e10722d49C1E758B2F8F1',
    contractAddress: '0xc05ba5529d964a9b2c46ebcd60564a4214ab7ba4',
    transferred: true,
    imageUrl: '/collections/chronicles_nogard_square.png',
    openseaUrl: 'https://opensea.io/collection/chronicles-of-nogard'
  },
  {
    name: 'Primordia Land',
    description: 'Digital land parcels connected to the "Zoofs" pet supplement company.',
    items: 2888,
    currentOwner: 'Antix.eth',
    contractAddress: '0xfbb87a6a4876820d996a9bbe106e4f73a5e4a71c',
    transferred: false,
    notIncluded: true,
    imageUrl: '/collections/primordia_land.gif',
    openseaUrl: 'https://opensea.io/collection/primordia-land'
  }
];

// Helper to find a contract by address
export const findContract = (address: string): ContractInfo | undefined => {
  return contracts.find(c => c.contractAddress.toLowerCase() === address.toLowerCase());
}; 