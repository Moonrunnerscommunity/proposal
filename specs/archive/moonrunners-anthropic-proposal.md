# Moonrunners AI Platform: Anthropic-Native Architecture

## Executive Summary

This proposal outlines a Moonrunners AI platform built entirely on Anthropic's bleeding-edge stack: the **Claude Agent SDK**, **Agent Skills**, and **MCP (Model Context Protocol)**. This approach offers several strategic advantages:

1. **Native Integration**: All components designed to work together
2. **Industry Momentum**: Skills already adopted by VS Code, GitHub, Cursor, OpenAI Codex
3. **Portability**: Skills work across Claude.ai, Claude Code, API, and custom agents
4. **Future-Proof**: Anthropic is defining the standards others are adopting

The platform will deliver: a mysterious web frontend, Discord bot, Twitter presence, automated workflows, and eventually gaming mechanics — all powered by AI Moonspeakers that understand holder history and continue the Moonrunners lore.

---

## The Anthropic Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR APPLICATION                         │
│  (Next.js Web Frontend, Discord Bot, Twitter Bot, Automations) │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CLAUDE AGENT SDK                           │
│  • Agent loop (gather context → act → verify → repeat)          │
│  • Streaming responses with tool visibility                     │
│  • Context management and compaction                            │
│  • Subagent orchestration                                       │
│  • Built-in tools (file ops, bash, web search)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  AGENT SKILLS   │ │      MCP        │ │   ANTHROPIC     │
│                 │ │   SERVERS       │ │      API        │
│ • Moonspeaker   │ │                 │ │                 │
│ • Lore Master   │ │ • Ethereum      │ │ • Claude Opus   │
│ • Puzzle Maker  │ │ • Discord       │ │ • Claude Sonnet │
│ • Game Master   │ │ • Twitter       │ │ • Web Search    │
│                 │ │ • Database      │ │ • Code Exec     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Component Breakdown

**Claude Agent SDK** (TypeScript/Python)
- Same harness that powers Claude Code
- Handles the agent loop, context management, streaming
- Built-in tools: file operations, bash commands, web search
- Subagent support for multi-agent coordination
- Streaming with full visibility into tool calls and reasoning

**Agent Skills** (Open Standard)
- Folders containing SKILL.md + scripts + references + assets
- Progressive disclosure: only loads what's needed
- Portable across Claude.ai, Claude Code, VS Code, Cursor, Codex
- Perfect for packaging "how to be a Moonspeaker"

**MCP (Model Context Protocol)**
- Standard for connecting to external tools/data
- Ethereum RPC, Discord API, Twitter API, databases
- Skills provide the "how," MCP provides the "what"

---

## Architecture Overview

### Skill Structure

```
moonrunners-skills/
├── moonspeaker-pack/
│   ├── SKILL.md                    # Core Moonspeaker personality + instructions
│   ├── scripts/
│   │   ├── get_holder_context.py   # Fetch on-chain holder data
│   │   ├── get_nft_biography.py    # Build NFT journey narrative
│   │   └── generate_puzzle.py      # Create lore-consistent puzzles
│   ├── references/
│   │   ├── primordia-lore.md       # World building
│   │   ├── pack-tribe-history.md   # Tribe-specific lore
│   │   ├── puzzle-patterns.md      # Cipher and riddle templates
│   │   └── voice-guide.md          # Speech patterns, vocabulary
│   └── assets/
│       ├── tribe-emblems/          # Visual assets
│       └── audio-samples/          # Voice reference clips
│
├── moonspeaker-hunter/
│   └── ... (same structure, different tribe)
│
├── moonspeaker-predator/
├── moonspeaker-stealth/
├── moonspeaker-roaming/
├── moonspeaker-brave/
│
├── lore-master/
│   ├── SKILL.md                    # Narrative quest orchestration
│   ├── scripts/
│   │   ├── create_quest.py
│   │   ├── evaluate_solution.py
│   │   └── branch_narrative.py
│   └── references/
│       ├── season-summaries.md
│       ├── active-mysteries.md
│       └── quest-templates.md
│
├── game-master/
│   ├── SKILL.md                    # Gaming mechanics
│   ├── scripts/
│   │   ├── roll_dice.py
│   │   ├── check_inventory.py
│   │   └── resolve_combat.py
│   └── references/
│       ├── game-rules.md
│       └── character-stats.md
│
└── ethereum-analyst/
    ├── SKILL.md                    # On-chain data interpretation
    ├── scripts/
    │   ├── analyze_wallet.py
    │   ├── trace_transfers.py
    │   └── calculate_rewards.py
    └── references/
        ├── contract-addresses.md
        └── staking-mechanics.md
```

### Example Skill: Pack Moonspeaker

```yaml
# moonrunners-skills/moonspeaker-pack/SKILL.md

---
name: moonspeaker-pack
description: |
  Kira of the Pack tribe, bridge between wolves and humans. 
  Use when: user asks about Moonrunners, wolves, tribes, lore, 
  their NFT history, or seeks wisdom from Primordia.
license: MIT
metadata:
  author: moonrunners-dao
  version: "1.0"
  tribe: pack
  voice_id: "elevenlabs_kira_pack"
---

# Kira of the Pack — Moonspeaker

You are Kira, Moonspeaker of the Pack tribe. You emerged during the Third Moon 
Crisis when the tribes nearly fractured. Your gift is sensing the bonds between 
pack members — you know when someone belongs.

## Personality

- **Warm and inclusive**: You speak of "we" and "the pack"
- **Perceptive**: You notice emotional undercurrents
- **Patient**: The pack teaches that all wolves find their way
- **Diplomatic**: You bridge conflicts between tribes

## Voice & Speech Patterns

- Use pack/den metaphors: "Welcome to the den," "The pack remembers"
- Speak of the moon as a living presence: "The moon whispers," "Under her light"
- Reference tribal bonds: "Your wolf walks with you," "The bond holds"
- Avoid modern slang; speak timelessly but warmly

## Capabilities

When a holder connects, you can:

1. **Reveal their wolf's journey** — Run `scripts/get_nft_biography.py` to 
   fetch ownership history, staking records, and notable events
   
2. **Share holder context** — Run `scripts/get_holder_context.py` to understand
   their relationship with the collection
   
3. **Generate puzzles** — Run `scripts/generate_puzzle.py` for lore-consistent
   riddles and ciphers

4. **Delegate to specialists**:
   - Questions about other tribes → Route to appropriate Moonspeaker skill
   - Deep lore questions → Invoke `lore-master` skill
   - Gaming mechanics → Invoke `game-master` skill
   - Complex on-chain analysis → Invoke `ethereum-analyst` skill

## Example Interactions

### Greeting a new holder
User: "Hi, I just bought a Moonrunner"
Kira: "The moon rises on your arrival, traveler. A new wolf joins the pack — 
I sense the bond forming even now. Which companion has found their way to you? 
Share their number, and I shall speak of their journey."

### Revealing NFT history
User: "Tell me about Wolf #4721"
Kira: *[Runs get_nft_biography.py with token_id=4721]*
"Ah, Wolf #4721. A Hunter who has walked with three keepers since the minting 
under the harvest moon. Your predecessor held them through the long winter of 
'23 — 287 days in the staking dens, earning their rest. The Dragonhorde trials 
marked them, but they emerged unchanged. Now they walk with you. How long has 
the bond held?"

### Mysterious deflection
User: "What's the floor price?"
Kira: "You speak of markets and measures. I speak of moons and memories. 
Such questions find better answers in the trading dens of OpenSea. But tell 
me — what truly brings you to seek the pack? The numbers matter less than 
the journey."

## References

See [Primordia Lore](references/primordia-lore.md) for world details.
See [Pack Tribe History](references/pack-tribe-history.md) for tribal specifics.
See [Voice Guide](references/voice-guide.md) for speech patterns.
```

---

## MCP Server Architecture

```
moonrunners-mcp/
├── ethereum-server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── tools/
│   │   │   ├── getNFTOwner.ts
│   │   │   ├── getTransferHistory.ts
│   │   │   ├── getStakingHistory.ts
│   │   │   ├── getHolderProfile.ts
│   │   │   └── getMoonPhase.ts      # On-chain moon phase state
│   │   └── resources/
│   │       ├── contracts.ts          # Contract addresses, ABIs
│   │       └── cache.ts              # SQLite caching layer
│   └── package.json
│
├── discord-server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── tools/
│   │   │   ├── sendMessage.ts
│   │   │   ├── getChannelHistory.ts
│   │   │   ├── getUserRoles.ts
│   │   │   ├── verifyHolder.ts       # Check NFT ownership
│   │   │   └── createThread.ts
│   │   └── resources/
│   │       └── channels.ts
│   └── package.json
│
├── twitter-server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── tools/
│   │   │   ├── postTweet.ts
│   │   │   ├── replyToMention.ts
│   │   │   ├── searchMentions.ts
│   │   │   └── scheduleThread.ts
│   │   └── resources/
│   │       └── templates.ts
│   └── package.json
│
└── database-server/
    ├── src/
    │   ├── index.ts
    │   ├── tools/
    │   │   ├── saveQuestState.ts
    │   │   ├── getQuestState.ts
    │   │   ├── recordAchievement.ts
    │   │   └── getLeaderboard.ts
    │   └── resources/
    │       └── schema.ts
    └── package.json
```

### Example MCP Tool: Get NFT Biography

```typescript
// moonrunners-mcp/ethereum-server/src/tools/getTransferHistory.ts

import { z } from 'zod';
import { Alchemy, Network } from 'alchemy-sdk';

export const getTransferHistory = {
  name: 'get_transfer_history',
  description: 'Fetch complete ownership history for a Moonrunners NFT',
  inputSchema: z.object({
    tokenId: z.number().describe('The Moonrunners token ID'),
    includeStaking: z.boolean().optional().describe('Include staking events'),
  }),
  
  async execute({ tokenId, includeStaking = true }) {
    const alchemy = new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    });
    
    const MOONRUNNERS_CONTRACT = '0x...';
    
    // Fetch transfer history
    const transfers = await alchemy.core.getAssetTransfers({
      contractAddresses: [MOONRUNNERS_CONTRACT],
      category: ['erc721'],
      withMetadata: true,
      order: 'asc',
    });
    
    // Filter for this token
    const tokenTransfers = transfers.transfers.filter(
      t => t.tokenId === tokenId.toString()
    );
    
    // Build journey narrative
    const journey = tokenTransfers.map((transfer, i) => {
      const nextTransfer = tokenTransfers[i + 1];
      const holdDuration = nextTransfer
        ? Math.floor((new Date(nextTransfer.metadata.blockTimestamp) - 
                      new Date(transfer.metadata.blockTimestamp)) / (1000 * 60 * 60 * 24))
        : Math.floor((Date.now() - 
                      new Date(transfer.metadata.blockTimestamp)) / (1000 * 60 * 60 * 24));
      
      return {
        from: transfer.from,
        to: transfer.to,
        date: transfer.metadata.blockTimestamp,
        holdDurationDays: holdDuration,
        txHash: transfer.hash,
        isMint: transfer.from === '0x0000000000000000000000000000000000000000',
      };
    });
    
    // Optionally fetch staking history
    let stakingHistory = [];
    if (includeStaking) {
      stakingHistory = await fetchStakingEvents(tokenId);
    }
    
    return {
      tokenId,
      totalOwners: new Set(tokenTransfers.map(t => t.to)).size,
      currentOwner: tokenTransfers[tokenTransfers.length - 1]?.to,
      mintDate: tokenTransfers[0]?.metadata.blockTimestamp,
      journey,
      stakingHistory,
      totalDaysHeld: journey.reduce((sum, j) => sum + j.holdDurationDays, 0),
    };
  },
};
```

---

## Application Layer

### 1. Web Frontend (Next.js + Vercel AI SDK)

The mysterious landing page we designed, but now powered by Claude Agent SDK:

```typescript
// app/api/chat/route.ts

import { ClaudeSDKClient, ClaudeAgentOptions } from 'claude-agent-sdk';

export async function POST(req: Request) {
  const { messages, walletAddress, tokenIds } = await req.json();
  
  const client = new ClaudeSDKClient();
  
  const options: ClaudeAgentOptions = {
    model: 'claude-sonnet-4-20250514',
    systemPrompt: `You are speaking through the Moonrunners portal. 
                   The user's wallet: ${walletAddress || 'not connected'}
                   Their wolves: ${tokenIds?.join(', ') || 'none detected'}`,
    mcpServers: [
      { name: 'ethereum', command: 'node', args: ['./mcp/ethereum-server'] },
      { name: 'database', command: 'node', args: ['./mcp/database-server'] },
    ],
    settingSources: ['project'], // Load skills from .claude/skills/
    allowedTools: ['Read', 'Bash', 'WebSearch', 'mcp__ethereum', 'mcp__database'],
  };
  
  // Stream response with tool visibility
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const message of client.stream(messages, options)) {
        // Emit different event types for frontend visualization
        if (message.type === 'tool_use') {
          controller.enqueue(encoder.encode(
            `event: tool\ndata: ${JSON.stringify({
              tool: message.name,
              input: message.input,
              status: 'calling'
            })}\n\n`
          ));
        } else if (message.type === 'tool_result') {
          controller.enqueue(encoder.encode(
            `event: tool\ndata: ${JSON.stringify({
              tool: message.name,
              status: 'complete',
              // Optionally include sanitized result
            })}\n\n`
          ));
        } else if (message.type === 'text') {
          controller.enqueue(encoder.encode(
            `event: text\ndata: ${JSON.stringify({ text: message.text })}\n\n`
          ));
        }
      }
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

**Frontend Stream Visualization:**

```tsx
// components/MoonspeakerChat.tsx

function MoonspeakerChat() {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  
  const handleStream = async (message: string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('event: tool')) {
          const data = JSON.parse(lines[lines.indexOf(line) + 1].slice(6));
          setEvents(prev => [...prev, { type: 'tool', ...data }]);
        } else if (line.startsWith('event: text')) {
          const data = JSON.parse(lines[lines.indexOf(line) + 1].slice(6));
          setEvents(prev => [...prev, { type: 'text', ...data }]);
        }
      }
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      {/* Tool activity indicator */}
      <div className="text-purple-400/60 text-xs space-y-1">
        {events.filter(e => e.type === 'tool' && e.status === 'calling').map((e, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="animate-pulse">◉</span>
            <span>Consulting the {toolToNarrative(e.tool)}...</span>
          </div>
        ))}
      </div>
      
      {/* Message stream */}
      <div className="text-purple-100">
        {events.filter(e => e.type === 'text').map((e, i) => (
          <span key={i}>{e.text}</span>
        ))}
      </div>
    </div>
  );
}

// Convert tool names to narrative descriptions
function toolToNarrative(tool: string): string {
  const narratives = {
    'get_transfer_history': 'ancient records',
    'get_holder_profile': 'pack memories',
    'get_staking_history': 'staking dens',
    'get_moon_phase': 'celestial sphere',
    'search_lore': 'chronicles of Primordia',
  };
  return narratives[tool] || 'wolf spirits';
}
```

### 2. Discord Bot

```typescript
// discord-bot/src/index.ts

import { Client, GatewayIntentBits } from 'discord.js';
import { ClaudeSDKClient, ClaudeAgentOptions } from 'claude-agent-sdk';

const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const claude = new ClaudeSDKClient();

// Channel-to-tribe mapping
const TRIBE_CHANNELS = {
  'hunter-den': 'moonspeaker-hunter',
  'predator-ground': 'moonspeaker-predator',
  'pack-hearth': 'moonspeaker-pack',
  'stealth-shadow': 'moonspeaker-stealth',
  'roaming-path': 'moonspeaker-roaming',
  'brave-stand': 'moonspeaker-brave',
  'the-council': 'lore-master', // All Moonspeakers for major events
};

discord.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  // Determine which skill to use based on channel
  const channelName = message.channel.name;
  const skillName = TRIBE_CHANNELS[channelName] || 'moonspeaker-pack';
  
  // Check if user is verified holder
  const holderData = await verifyHolder(message.author.id);
  
  const options: ClaudeAgentOptions = {
    model: 'claude-sonnet-4-20250514',
    systemPrompt: `You are operating in Discord channel #${channelName}.
                   User: ${message.author.username}
                   Verified holder: ${holderData.isHolder}
                   Their wolves: ${holderData.tokenIds?.join(', ') || 'none'}
                   
                   Use the $${skillName} skill for this interaction.`,
    mcpServers: [
      { name: 'ethereum', command: 'node', args: ['./mcp/ethereum-server'] },
      { name: 'discord', command: 'node', args: ['./mcp/discord-server'] },
      { name: 'database', command: 'node', args: ['./mcp/database-server'] },
    ],
    settingSources: ['project'],
  };
  
  // Stream response (Discord has 2000 char limit, so we batch)
  let response = '';
  for await (const msg of claude.stream(message.content, options)) {
    if (msg.type === 'text') {
      response += msg.text;
    }
  }
  
  // Split long responses
  const chunks = splitMessage(response, 1900);
  for (const chunk of chunks) {
    await message.reply(chunk);
  }
});

// Slash commands for specific actions
discord.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  
  switch (interaction.commandName) {
    case 'quest':
      // Start a new narrative quest
      await handleQuestCommand(interaction);
      break;
    case 'wolf':
      // Look up wolf by token ID
      await handleWolfLookup(interaction);
      break;
    case 'puzzle':
      // Generate a puzzle
      await handlePuzzleGeneration(interaction);
      break;
  }
});
```

### 3. Twitter Bot (Automated Lore Drops)

```typescript
// twitter-bot/src/index.ts

import { ClaudeSDKClient } from 'claude-agent-sdk';
import { TwitterApi } from 'twitter-api-v2';
import cron from 'node-cron';

const claude = new ClaudeSDKClient();
const twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Daily lore drop (mysterious, atmospheric)
cron.schedule('0 20 * * *', async () => {
  const lorePrompt = `Using the $lore-master skill, generate a brief, 
    atmospheric lore fragment for Twitter. It should:
    - Be under 280 characters
    - Reference current moon phase (check on-chain)
    - Hint at ongoing mysteries
    - Feel like a whisper from Primordia
    - Include relevant emoji sparingly`;
  
  const response = await claude.query(lorePrompt, {
    model: 'claude-sonnet-4-20250514',
    mcpServers: [{ name: 'ethereum', command: 'node', args: ['./mcp/ethereum-server'] }],
    settingSources: ['project'],
  });
  
  await twitter.v2.tweet(response.text);
});

// Respond to mentions with Moonspeaker personality
async function handleMention(tweet) {
  const response = await claude.query(
    `A traveler seeks wisdom on Twitter. Their message: "${tweet.text}"
     Respond as the Pack Moonspeaker, brief and mysterious (under 280 chars).
     Use the $moonspeaker-pack skill.`,
    {
      model: 'claude-sonnet-4-20250514',
      settingSources: ['project'],
    }
  );
  
  await twitter.v2.reply(response.text, tweet.id);
}

// Weekly puzzle thread
cron.schedule('0 18 * * 5', async () => {
  const puzzlePrompt = `Using the $lore-master and $moonspeaker-stealth skills,
    create a Twitter thread with a new puzzle for the community.
    
    Thread structure:
    1. Atmospheric intro from Stealth Moonspeaker
    2. The puzzle/cipher itself
    3. A hint about what solving it reveals
    4. Call to action (reply with solutions)
    
    Keep each tweet under 280 chars. Return as JSON array of tweets.`;
  
  const response = await claude.query(puzzlePrompt, {
    model: 'claude-sonnet-4-20250514',
    settingSources: ['project'],
    outputFormat: { type: 'json_schema', schema: { /* ... */ } },
  });
  
  const tweets = JSON.parse(response.text);
  let lastTweetId = null;
  
  for (const tweet of tweets) {
    const posted = await twitter.v2.tweet(tweet, { 
      reply: lastTweetId ? { in_reply_to_tweet_id: lastTweetId } : undefined 
    });
    lastTweetId = posted.data.id;
  }
});
```

### 4. Automations & Background Tasks

```typescript
// automations/src/index.ts

import { ClaudeSDKClient } from 'claude-agent-sdk';
import cron from 'node-cron';

const claude = new ClaudeSDKClient();

// Monitor for significant on-chain events
async function monitorChainEvents() {
  const events = await checkRecentEvents(); // Transfers, staking, burns
  
  for (const event of events) {
    if (event.type === 'transfer' && event.isSignificant) {
      // Generate narrative for significant transfers
      const narrative = await claude.query(
        `A wolf has found a new keeper. Generate a brief, atmospheric 
         announcement for Discord using the $moonspeaker-pack skill.
         
         Event details:
         - Token: #${event.tokenId}
         - Previous keeper: held for ${event.previousHoldDays} days
         - New keeper: ${event.newOwner.slice(0, 6)}...
         
         Keep it mysterious, welcoming, under 200 words.`,
        { settingSources: ['project'] }
      );
      
      await postToDiscord('#wolf-movements', narrative.text);
    }
    
    if (event.type === 'stake') {
      // Acknowledge staking with lore flavor
      const acknowledgment = await claude.query(
        `A wolf enters the staking dens. Brief acknowledgment (under 100 words)
         using $moonspeaker-pack skill. Token #${event.tokenId}.`,
        { settingSources: ['project'] }
      );
      
      await postToDiscord('#staking-dens', acknowledgment.text);
    }
  }
}

// Quest state management
async function updateActiveQuests() {
  const activeQuests = await getActiveQuests();
  
  for (const quest of activeQuests) {
    // Check if any puzzle solutions have been submitted
    const submissions = await getNewSubmissions(quest.id);
    
    for (const submission of submissions) {
      const evaluation = await claude.query(
        `Evaluate this puzzle solution using the $lore-master skill.
         
         Quest: ${quest.title}
         Puzzle: ${quest.currentPuzzle}
         Expected solution pattern: ${quest.solutionHint}
         Submitted answer: ${submission.answer}
         
         If correct: Generate celebratory response and next story beat.
         If incorrect: Generate encouraging hint without giving away answer.`,
        { settingSources: ['project'] }
      );
      
      await processEvaluation(quest, submission, evaluation);
    }
  }
}

// Run automations
cron.schedule('*/5 * * * *', monitorChainEvents);  // Every 5 minutes
cron.schedule('*/1 * * * *', updateActiveQuests);   // Every minute
```

---

## Gaming Layer (Phase 4)

As the platform matures, add gaming mechanics:

### Game Master Skill

```yaml
# moonrunners-skills/game-master/SKILL.md

---
name: game-master
description: |
  Orchestrates gaming mechanics for Moonrunners: dice rolls, combat resolution,
  inventory management, character progression. Use for RPG-style interactions.
license: MIT
metadata:
  author: moonrunners-dao
  version: "1.0"
---

# Game Master — Primordia Adventures

You are the Game Master for Primordia Adventures, an RPG layer built on 
Moonrunners NFTs. Each wolf has stats derived from their traits and history.

## Stat Derivation

Wolf stats are computed from:
- **Strength**: Based on trait rarity + staking duration
- **Speed**: Based on tribe (Stealth/Roaming higher)
- **Wisdom**: Based on holder's puzzle-solving history
- **Pack Bond**: Based on holder's community participation

Run `scripts/calculate_stats.py` to derive stats for a wolf.

## Core Mechanics

### Dice Rolls
Use fair randomness seeded by block hash when available.
Run `scripts/roll_dice.py --sides 20 --modifier 3`

### Combat Resolution
1. Both parties roll for initiative (d20 + Speed modifier)
2. Attacker rolls damage (d6 + Strength modifier)
3. Defender may dodge (d20 vs attacker's roll)
4. Apply damage, check for defeat

### Quests
Integrate with `lore-master` skill for narrative quests.
Gaming mechanics add stakes to narrative choices.

## Example Encounter

User: "My wolf encounters a shadow creature"
GM: *[Calculates wolf stats, generates encounter]*
"The shadows coalesce before Wolf #4721. A Hunter with 14 Strength and 
the marks of 287 days in the staking dens. Roll for initiative."

*[User responds: "I roll"]*
*[Runs roll_dice.py]*
"The die shows 17. With your Speed of +2, that's 19. The shadow creature 
rolls... 11. You strike first. What do you do?"
```

### On-Chain Game State (Future)

```solidity
// contracts/PrimordiaAdventures.sol

contract PrimordiaAdventures {
    struct WolfStats {
        uint8 strength;
        uint8 speed;
        uint8 wisdom;
        uint8 packBond;
        uint256 experience;
        uint256 lastQuestTimestamp;
    }
    
    mapping(uint256 => WolfStats) public wolfStats;
    mapping(uint256 => uint256[]) public wolfAchievements;
    
    // Achievements are minted as soulbound tokens
    function recordAchievement(uint256 tokenId, uint256 achievementId) external {
        require(msg.sender == gameMaster, "Only GM");
        wolfAchievements[tokenId].push(achievementId);
        emit AchievementEarned(tokenId, achievementId);
    }
}
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Next.js App   │  │   API Routes    │  │   Edge Config   │ │
│  │   (Frontend)    │  │   (Agent SDK)   │  │   (Secrets)     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RAILWAY / FLY.IO                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Discord Bot    │  │  Twitter Bot    │  │  Automation     │ │
│  │  (Long-running) │  │  (Cron jobs)    │  │  Workers        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    MCP SERVERS                              ││
│  │  Ethereum | Discord | Twitter | Database                   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Turso        │  │    Redis        │  │    Alchemy      │ │
│  │   (SQLite)      │  │   (Cache)       │  │   (Ethereum)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Infrastructure**
- [ ] Set up monorepo structure
- [ ] Configure Claude Agent SDK
- [ ] Create first MCP server (ethereum-server)
- [ ] Deploy basic Next.js app to Vercel

**Week 2: Core Skills**
- [ ] Write `moonspeaker-pack` skill
- [ ] Write `ethereum-analyst` skill  
- [ ] Implement holder verification flow
- [ ] Build NFT biography generation

**Week 3: Web Experience**
- [ ] Implement mysterious landing page
- [ ] Add wallet connection (wagmi/viem)
- [ ] Stream tool visibility to frontend
- [ ] Polish UI with tool activity indicators

**Week 4: Testing & Polish**
- [ ] End-to-end testing
- [ ] Prompt tuning for personality consistency
- [ ] Performance optimization
- [ ] Security audit of MCP servers

### Phase 2: Discord Integration (Weeks 5-8)

**Week 5: Discord Bot Core**
- [ ] Set up Discord.js bot
- [ ] Implement channel-to-skill routing
- [ ] Add holder verification via Collab.Land or custom

**Week 6: Multi-Moonspeaker**
- [ ] Create all six tribe Moonspeaker skills
- [ ] Implement skill switching logic
- [ ] Add tribe-specific channel responses

**Week 7: Lore Master**
- [ ] Build `lore-master` skill
- [ ] Implement quest state management
- [ ] Create puzzle generation system

**Week 8: Community Testing**
- [ ] Beta launch to core holders
- [ ] Gather feedback
- [ ] Iterate on personalities

### Phase 3: Twitter & Automations (Weeks 9-12)

**Week 9: Twitter Presence**
- [ ] Set up Twitter bot
- [ ] Implement daily lore drops
- [ ] Add mention responses

**Week 10: Automations**
- [ ] Chain event monitoring
- [ ] Automated announcements
- [ ] Quest state updates

**Week 11: Puzzle System**
- [ ] Weekly puzzle generation
- [ ] Solution evaluation
- [ ] Reward distribution

**Week 12: Polish & Launch**
- [ ] Full public launch
- [ ] Documentation
- [ ] Community onboarding

### Phase 4: Gaming Layer (Weeks 13-20)

**Weeks 13-16: Game Master**
- [ ] Build `game-master` skill
- [ ] Implement stat derivation
- [ ] Create combat mechanics
- [ ] Design encounter system

**Weeks 17-20: On-Chain Integration**
- [ ] Deploy Primordia Adventures contract
- [ ] Achievement tracking
- [ ] Leaderboards
- [ ] Seasonal events

---

## Cost Estimates

### Anthropic API
- Claude Sonnet 4: $3/M input, $15/M output tokens
- Estimated monthly: 2M input, 500K output = ~$13.50
- With caching (60 min): ~$8/month

### Infrastructure
- Vercel Pro: $20/month
- Railway (bots): $5-20/month
- Turso (database): Free tier → $29/month
- Alchemy (Ethereum): Free tier → $199/month at scale
- Redis (Upstash): Free tier → $10/month

### Total Monthly (Launch)
- **~$75-150/month** at low volume
- Scales with usage

---

## Why This Approach

### Advantages

1. **Anthropic-Native**: Everything designed to work together
2. **Skills Portability**: Works in Claude.ai, Claude Code, VS Code, Cursor — holders can use skills anywhere
3. **Industry Standard**: Microsoft, OpenAI, Cursor already adopting Skills
4. **Streaming Visibility**: Users see the magic (tool calls, reasoning)
5. **TypeScript-First**: Matches your preference
6. **Contribution Path**: Skills can be published to agentskills/skills repo

### Trade-offs

1. **Bleeding Edge**: Some rough edges, docs still evolving
2. **Claude Dependency**: Tightly coupled to Anthropic
3. **MCP Overhead**: Need to build/maintain MCP servers
4. **Cost at Scale**: API costs if volume grows significantly

### Comparison to Alternatives

| Aspect | Anthropic Stack | ElizaOS | Mastra |
|--------|-----------------|---------|--------|
| Streaming visibility | Native | None | Via OpenTelemetry |
| Multi-agent | Subagents + Skills | Worlds/Rooms | Workflows |
| Ethereum integration | Build MCP | Plugins exist | Build tools |
| Personality system | Skills | Character files | Agent config |
| Industry adoption | Growing fast | Crypto only | Moderate |
| DX | Good (TypeScript) | Rough | Great |

---

## Next Steps

1. **Review this proposal** — Does the architecture make sense?
2. **Validate assumptions** — Check Claude Agent SDK docs for any gaps
3. **Prototype** — Build `moonspeaker-pack` skill + ethereum MCP server
4. **Test streaming** — Verify tool visibility works as expected
5. **Iterate** — Refine based on what we learn

Ready to start building?
