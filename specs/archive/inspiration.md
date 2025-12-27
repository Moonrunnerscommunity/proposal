# Moonrunners AI Revival: Project Brief

## Executive Summary

Moonrunners is an NFT collection with deep narrative IP (four seasons of interactive lore, six wolf tribes, the world of Primordia) that was acquired through community takeover. The collection has 9,997 NFTs, ~2,197 committed holders, and a floor price of ~0.006 ETH — but the IP and community loyalty are the real assets.

This project will revive Moonrunners by building **story-first, AI-enabled experiences** on the ElizaOS framework. The core innovation: AI agents (Moonspeakers) that understand holder history, NFT provenance, and collection lore — creating personalized narrative experiences that no other NFT project has achieved.

**The thesis**: Most NFT AI projects are trading bots and market commentary. Moonrunners will pioneer narrative AI — agents that know your wolf's journey, remember the pack's history, and continue the story.

---

## The Moonrunners IP

### World Setting: Primordia
An ancient, fractured planet hosting a wolfpack civilization. The world is structured around moon phases (coded into the smart contract) and tribal affiliations.

### The Six Tribes
Each tribe has distinct characteristics, values, and narrative roles:

1. **Hunter** — Trackers, providers, pragmatic
2. **Predator** — Warriors, fierce, protective
3. **Pack** — Community-focused, diplomatic, connectors
4. **Stealth** — Shadow-walkers, intelligence gatherers, secretive
5. **Roaming** — Wanderers, explorers, knowledge-seekers
6. **Brave** — Frontline defenders, courageous, honor-bound

### Key Narrative Elements
- **Nogard's Kidnapping**: Central story hook — a pup kidnapped under a crimson full moon
- **The Moonspeakers**: Six bridge figures between wolves and humans (one per tribe) — these become our AI characters
- **Four Seasons of Interactive Lore**: Previous storytelling used polls, ciphers, puzzles, and riddles for community participation
- **Moon Phase Mechanics**: On-chain moon phases affect the world state

### Extended Collections
- **Dragonhorde** (2,311 dragons) — Resurrected through burn mechanics
- **Secrets of Primordia** (12,800 weapons)
- **Chronicles of Nogard** — Lore NFTs
- **History of Primordia** — Lore NFTs

### Licensing
CC0 — unlimited derivative creation without permission.

---

## Technical Platform: ElizaOS

### Why ElizaOS
- **Personality-first architecture**: Character files are the core primitive, not workflows
- **Native Discord/Twitter/Telegram clients**: First-class integrations, not bolted-on
- **Ethereum plugin ecosystem**: 18+ chain support, NFT data via Ankr plugin
- **Open source contribution opportunity**: Underserved narrative/storytelling niche
- **TypeScript-based**: Aligns with web development background
- **Multi-agent support (v2)**: Worlds/Rooms system for agent coordination

### ElizaOS Core Concepts
```
Agent           = A character with personality, goals, knowledge
Character File  = JSON defining personality, bio, style, knowledge
Provider        = Injects dynamic context into agent (this is where holder history goes)
Action          = Something the agent can do (respond, search, execute)
Evaluator       = Post-interaction analysis and learning
Plugin          = Reusable package of providers, actions, evaluators
World           = Workspace/server containing multiple agents
Room            = Channel where agents interact with users and each other
```

### Existing Relevant Plugins
- `plugin-ankr`: NFT holders, metadata, transfers, wallet interactions
- `plugin-nft-collections`: Market data, floor prices, trading analytics
- `plugin-evm`: Multi-chain support, contract interactions
- `plugin-discord`: Full Discord integration with voice support
- `plugin-twitter`: Posting, replying, timeline management

### Gaps We Will Fill (Contribution Opportunity)
- **NFT provenance/holder history synthesis**
- **Narrative/storytelling primitives**
- **Interactive fiction patterns (branching dialogue, puzzles)**
- **Lore-aware context injection**

---

## Project Architecture

### Phase 1: Foundation — The First Moonspeaker

Build one fully-realized Moonspeaker agent as proof of concept.

**Character Selection**: Choose one tribe's Moonspeaker (recommend starting with Pack tribe — community-focused, diplomatic, good for welcoming interactions)

**Core Components**:

```
moonrunners-moonspeaker/
├── characters/
│   └── pack-moonspeaker.json      # Character definition
├── plugins/
│   └── plugin-moonrunners/
│       ├── providers/
│       │   ├── holderContextProvider.ts    # Inject holder history
│       │   ├── nftBiographyProvider.ts     # Inject NFT journey
│       │   ├── loreContextProvider.ts      # Inject relevant lore
│       │   └── moonPhaseProvider.ts        # Current moon phase state
│       ├── actions/
│       │   ├── getNFTJourney.ts            # Full ownership history
│       │   ├── getHolderProfile.ts         # Wallet's Moonrunners history
│       │   ├── getStakingHistory.ts        # Rewards, duration
│       │   ├── getTribeInfo.ts             # Tribe lore and members
│       │   └── verifyHolder.ts             # Confirm NFT ownership
│       ├── evaluators/
│       │   └── narrativeEvaluator.ts       # Track story engagement
│       └── index.ts
├── knowledge/
│   ├── primordia-lore.md           # World building docs
│   ├── tribe-histories.md          # Each tribe's background
│   ├── season-summaries.md         # Previous interactive lore
│   └── character-bios.md           # Key characters and relationships
└── index.ts
```

**Character File Structure** (pack-moonspeaker.json):
```json
{
  "name": "Kira of the Pack",
  "description": "Moonspeaker of the Pack tribe, bridge between wolves and humans",
  "personality": {
    "traits": ["diplomatic", "warm", "perceptive", "patient", "community-focused"],
    "speaking_style": "Speaks with warmth and inclusion, uses 'pack' and 'den' metaphors, asks about the collective before the individual",
    "knowledge_areas": ["Pack tribe history", "Primordia politics", "Inter-tribe relations", "Community rituals"]
  },
  "background": "Kira emerged as Moonspeaker during the Third Moon Crisis when the tribes nearly fractured. Her gift is sensing the bonds between pack members — she knows when someone belongs.",
  "goals": [
    "Welcome new wolves to the pack",
    "Preserve and share tribal history",
    "Strengthen bonds between holders",
    "Continue the story of Nogard"
  ],
  "knowledge": ["./knowledge/primordia-lore.md", "./knowledge/tribe-histories.md"],
  "plugins": ["@moonrunners/plugin-moonrunners"],
  "clients": ["discord", "twitter"],
  "settings": {
    "secrets": {
      "ALCHEMY_API_KEY": "",
      "MOONRUNNERS_CONTRACT": "0x...",
      "DRAGONHORDE_CONTRACT": "0x...",
      "STAKING_CONTRACT": "0x..."
    }
  }
}
```

**Holder Context Provider** (core innovation):
```typescript
// providers/holderContextProvider.ts
// This provider injects personalized holder history into every interaction

interface HolderContext {
  wallet: string;
  moonrunnersOwned: NFT[];
  dragonhordeOwned: NFT[];
  totalHoldDuration: number;  // days as Moonrunners holder
  stakingHistory: {
    totalStaked: number;
    totalRewards: string;
    currentlyStaking: boolean;
  };
  acquisitionHistory: {
    firstAcquisition: Date;
    method: 'mint' | 'purchase' | 'transfer';
    previousOwners: number;
  };
  tribeAffiliation: string;  // Derived from owned wolves
  narrativeStatus: {
    puzzlesSolved: number;
    loreContributions: number;
    communityRank: string;
  };
}

// The agent sees this context and can naturally reference:
// "Your wolf has been with the pack for 847 days..."
// "I see you acquired Wolf #4721 during the Great Migration..."
// "The Hunter tribe thanks you for your service in the staking dens..."
```

**NFT Biography Provider**:
```typescript
// providers/nftBiographyProvider.ts
// Every NFT has a story — who held it, for how long, what happened

interface NFTBiography {
  tokenId: number;
  name: string;
  tribe: string;
  traits: Record<string, string>;

  journey: {
    mintedTo: string;
    mintDate: Date;
    transfers: Array<{
      from: string;
      to: string;
      date: Date;
      holdDuration: number;  // days
      salePrice?: string;    // ETH if sold
    }>;
    currentHolder: string;
    currentHoldDuration: number;
  };

  history: {
    wasStaked: boolean;
    stakingPeriods: Array<{ start: Date; end: Date; rewards: string }>;
    gameParticipation: string[];  // Events this NFT participated in
    burnSurvived: boolean;        // Dragonhorde burn mechanic
  };

  // Computed narrative elements
  narrative: {
    isOG: boolean;           // Held since mint
    isLongHolder: boolean;   // 1+ year
    hasJourney: boolean;     // Multiple owners
    notableEvents: string[]; // "Survived the Dragonhorde burn", etc.
  };
}

// The agent can say:
// "Ah, Wolf #3842. A Hunter who has known four keepers.
//  Your predecessor held them through the long winter of '23.
//  I sense the marks of the staking dens upon them —
//  they earned their rest in the Dragonhorde trials."
```

### Phase 2: The Moonspeaker Council

Expand to all six Moonspeakers, each with distinct personality and tribal knowledge.

**Multi-Agent Architecture**:
```
World: Primordia
├── Room: The Council Chamber (all Moonspeakers)
├── Room: Hunter's Den (Hunter Moonspeaker + Hunter holders)
├── Room: Predator's Ground (Predator Moonspeaker + Predator holders)
├── Room: Pack's Hearth (Pack Moonspeaker + Pack holders)
├── Room: Stealth's Shadow (Stealth Moonspeaker + Stealth holders)
├── Room: Roaming's Path (Roaming Moonspeaker + Roaming holders)
└── Room: Brave's Stand (Brave Moonspeaker + Brave holders)
```

**Agent-to-Agent Coordination**:
- Moonspeakers can debate tribal decisions in Council Chamber
- Cross-tribe queries get routed to appropriate Moonspeaker
- Collective narrative decisions require consensus mechanics

**Discord Implementation**:
```
#general          → Any Moonspeaker responds based on context
#hunter-den       → Hunter Moonspeaker primary, others can visit
#the-council      → All Moonspeakers, for major announcements
#lore-mysteries   → Puzzle/riddle content, Stealth Moonspeaker leads
```

### Phase 3: Interactive Narrative Experiences

**The Dungeon Master System**:

Recreate Moonrunners' signature interactive lore experiences with AI:

```typescript
// actions/startNarrativeQuest.ts

interface NarrativeQuest {
  id: string;
  title: string;
  chapters: Chapter[];
  currentChapter: number;
  participants: Map<string, ParticipantState>;

  // Branching based on community choices
  branches: {
    condition: string;      // "majority_vote", "puzzle_solved", "holder_action"
    outcomes: Outcome[];
  }[];
}

interface Chapter {
  narration: string;
  puzzle?: {
    type: 'cipher' | 'riddle' | 'vote' | 'scavenger' | 'collaboration';
    content: string;
    solution: string;
    hints: string[];
    hintsRevealed: number;
  };
  choices?: {
    text: string;
    consequence: string;  // Affects next chapter
  }[];
  requirements?: {
    minParticipants?: number;
    requiredTribes?: string[];
    holderOnly?: boolean;
  };
}
```

**Example Quest Flow**:
1. Stealth Moonspeaker posts cryptic message in #lore-mysteries
2. Message contains a cipher (AI-generated but lore-consistent)
3. Community collaborates to solve in thread
4. Solution unlocks next story beat
5. Story beat includes a choice (vote or action-based)
6. Choice affects which branch the narrative follows
7. Participants' NFTs gain "narrative achievements" (off-chain or on-chain)

**Puzzle Generation**:
```typescript
// The AI generates lore-consistent puzzles
const puzzlePrompt = `
You are the Stealth Moonspeaker creating a cipher for the pack.
The solution should be: "${targetSolution}"
The cipher should:
- Reference Primordia lore naturally
- Be solvable with collaborative effort
- Include subtle hints in the flavor text
- Feel like it belongs in the Moonrunners universe
`;
```

### Phase 4: Voice-Enabled Lore

**ElevenLabs Integration**:
- Each Moonspeaker has a distinct voice
- Lore can be delivered as audio
- Discord voice channel presence for "campfire stories"

```typescript
// services/voiceService.ts
interface MoonspeakerVoice {
  moonspeaker: string;
  elevenLabsVoiceId: string;
  voiceSettings: {
    stability: number;
    similarity_boost: number;
    style: number;
  };
}

// Pack Moonspeaker: Warm, melodic, inclusive
// Hunter Moonspeaker: Low, deliberate, patient
// Predator Moonspeaker: Intense, commanding, fierce
// Stealth Moonspeaker: Whispered, mysterious, cryptic
// Roaming Moonspeaker: Wistful, storytelling cadence
// Brave Moonspeaker: Bold, inspiring, rallying
```

**Voice Use Cases**:
- "Tell me about my wolf" → Spoken NFT biography
- Campfire story sessions in Discord voice
- Lore drops as audio clips on Twitter
- Personalized welcome messages for new holders

---

## Data Architecture

### On-Chain Data Sources

**Moonrunners Contract** (0x...):
- tokenURI → metadata, traits
- ownerOf → current holder
- Transfer events → ownership history

**Dragonhorde Contract** (0x...):
- Same pattern
- Burn events → survival status

**Staking Contract** (0x...):
- Stake/Unstake events → staking history
- Reward claims → earnings history

### Data Pipeline

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Alchemy API    │────▶│  Data Indexer   │────▶│  SQLite/PG      │
│  (Transfers)    │     │  (Background)   │     │  (Cache)        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐            │
│  Contract RPCs  │────▶│  Event Parser   │────────────┤
│  (Events)       │     │  (Staking/Game) │            │
└─────────────────┘     └─────────────────┘            │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Provider Layer │
                                               │  (ElizaOS)      │
                                               └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Agent Context  │
                                               └─────────────────┘
```

### Caching Strategy
- **Hot data**: Current holders, recent transfers (1 hour TTL)
- **Warm data**: NFT biographies, holder profiles (24 hour TTL)
- **Cold data**: Historical staking, game events (refresh weekly)
- **Static data**: Lore, tribe info (refresh on deploy)

---

## ElizaOS Contribution Strategy

### Plugin: @moonrunners/plugin-nft-provenance

A general-purpose plugin other NFT projects can use:

```typescript
// Reusable across any ERC-721 collection
interface NFTProvenanceConfig {
  contractAddress: string;
  chainId: number;
  alchemyApiKey: string;
  additionalContracts?: {  // Staking, gaming, etc.
    address: string;
    type: 'staking' | 'game' | 'burn' | 'custom';
    eventSignatures: string[];
  }[];
}

// Actions
- getNFTProvenance(contractAddress, tokenId)
- getHolderHistory(contractAddress, walletAddress)
- getCollectionStats(contractAddress)

// Providers
- nftProvenanceProvider  // Injects NFT journey into context
- holderProfileProvider  // Injects holder history into context
```

### Plugin: @moonrunners/plugin-narrative

Interactive storytelling primitives:

```typescript
// Actions
- startQuest(questConfig)
- submitPuzzleSolution(questId, solution)
- makeNarrativeChoice(questId, choiceId)
- getQuestStatus(questId)

// Providers
- narrativeContextProvider  // Current quest state
- achievementProvider       // What this holder has accomplished

// Evaluators
- narrativeEngagementEvaluator  // Track story participation
```

### Contribution Path
1. Build for Moonrunners first
2. Abstract reusable components
3. Submit PRs to elizaos-plugins organization
4. Document with Moonrunners as case study
5. Present at ElizaOS community calls

---

## Implementation Roadmap

### Month 1: Foundation
- [ ] Set up ElizaOS development environment
- [ ] Create Moonrunners contract indexer (Alchemy)
- [ ] Build holderContextProvider
- [ ] Build nftBiographyProvider
- [ ] Create Pack Moonspeaker character file
- [ ] Write core Primordia lore knowledge base
- [ ] Deploy to Discord (holder-gated channel)

### Month 2: Expansion
- [ ] Add remaining 5 Moonspeakers
- [ ] Implement multi-agent World/Room architecture
- [ ] Build Twitter client integration
- [ ] Create first interactive narrative quest
- [ ] Add puzzle generation capabilities

### Month 3: Voice & Polish
- [ ] Integrate ElevenLabs for voice
- [ ] Discord voice channel features
- [ ] Refine personalities based on community feedback
- [ ] Abstract plugins for ElizaOS contribution
- [ ] Documentation and case study

### Month 4: Community & Growth
- [ ] Launch public Twitter presence
- [ ] Begin regular narrative content schedule
- [ ] Submit plugins to ElizaOS
- [ ] Expand narrative quest system
- [ ] Explore on-chain achievement tracking

---

## Success Metrics

### Engagement
- Discord daily active users
- Average conversation length with Moonspeakers
- Quest participation rate
- Repeat interactions per holder

### Community
- Holder sentiment (before/after)
- New holder acquisition attributed to AI features
- Community-generated content volume
- Social media mentions/engagement

### Technical
- Response latency (target: <2s)
- Uptime (target: 99%)
- Context accuracy (holder history correctness)
- Plugin adoption by other projects

### Contribution
- ElizaOS GitHub stars/forks on contributed plugins
- Other projects using narrative plugins
- Community pull requests

---

## Open Questions for Development

1. **Holder Verification Flow**: How do we securely verify Discord/Twitter users own specific NFTs? Options: Collab.Land, custom signature verification, wallet connection flow.

2. **Narrative Persistence**: Where do quest states and achievements live? Options: SQLite (simple), PostgreSQL (scalable), on-chain (expensive but permanent).

3. **Voice Costs**: ElevenLabs pricing at scale. Do we gate voice features to certain holder tiers? Use cached audio for common responses?

4. **Multi-Agent Coordination**: How sophisticated should Moonspeaker-to-Moonspeaker interaction be? Simple routing vs. actual debate/consensus?

5. **Content Moderation**: How do we handle inappropriate user inputs while maintaining narrative immersion?

6. **Lore Canon**: Who has authority to add to canon? Can AI-generated narrative become official lore?

---

## Resources

### Moonrunners
- Contract: [TBD - need addresses]
- Existing lore documentation: [TBD]
- Community Discord: [TBD]
- Twitter: [TBD]

### ElizaOS
- Documentation: https://docs.elizaos.ai
- GitHub: https://github.com/elizaOS/eliza
- Plugin Registry: https://docs.elizaos.ai/plugin-registry/overview

### APIs
- Alchemy: https://www.alchemy.com/nft-api
- ElevenLabs: https://elevenlabs.io/docs
- Ankr: https://www.ankr.com/docs/

### Related Projects (Inspiration)
- Forgotten Runes Wizard's Cult — Community-collaborative storytelling
- Loot — Narrative primitives
- Pudgy Penguins — Community takeover success story

---

## Getting Started

```bash
# Clone ElizaOS
git clone https://github.com/elizaOS/eliza.git
cd eliza

# Install dependencies
bun install

# Create Moonrunners project
elizaos create moonrunners-moonspeakers

# Start development
cd moonrunners-moonspeakers
elizaos dev
```

First task: Create the Pack Moonspeaker character file and holderContextProvider. Start with a simple "tell me about my wolf" interaction that pulls real on-chain data.

---

*Document Version: 1.0*
*Created: December 2024*
*For: Moonrunners Community Takeover - AI Initiative*
