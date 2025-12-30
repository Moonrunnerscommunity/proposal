# NFT MCP: AI-Powered NFT Intelligence

## The Problem

NFT collections have rich on-chain history — ownership journeys, diamond hands, flipper patterns, community loyalty — but no way to surface it meaningfully. Existing tools show raw data. Holders want stories.

## The Solution

**NFT MCP** is infrastructure that lets AI agents understand and narrate NFT provenance. It consists of:

- **Provenance MCP Server** — Fetches indexed on-chain data (ownership history, hold durations, transfer patterns)
- **Provenance Skill** — Teaches AI agents how to interpret and narrate that data meaningfully
- **Collection Skills** (optional) — Custom personality, lore, and voice for specific collections

Any AI that supports MCP (Claude, ChatGPT, Cursor, etc.) can use this to answer questions like "tell me about this NFT's journey" or "am I a diamond hands holder?"

## How It Works

Collections are indexed via The Graph. Once indexed, anyone can query them — through our web chat, their own Claude, or a Discord bot.

**Flagship Example: Moonrunners**

moonrunners.io demonstrates the full potential: a Moonspeaker character who knows Primordia lore, recognizes your wolves, and speaks in narrative voice. This is the provenance infrastructure plus a custom collection skill plus a tailored system prompt.

Other collections can replicate this depth or simply use the generic provenance layer.

## Business Model

| Action | Cost | You Get |
|--------|------|---------|
| Try it | Free | 5 messages (indexed collections only) |
| Connect wallet | Free | 25 messages |
| Index a collection | ~$50-100 one-time | Collection indexed forever + 100 bonus messages |
| Subscribe | $10/month | Unlimited messages + remote MCP for Claude + Discord bot |

Indexing is crowdfunded — any enthusiast can pay to index a collection, and everyone benefits. Collection owners can reimburse later or let their community handle it.

## Technical Stack

- **The Graph** — Indexes ERC-721 transfer events, computes hold durations
- **MCP Protocol** — Standard interface for AI tool use (Anthropic spec)
- **Agent Skills** — Standard format for procedural AI knowledge (Anthropic spec)
- **Unlock Protocol** — Crypto-native subscription payments

No databases to maintain. No webhooks. The Graph handles indexing; the MCP server is a thin query layer.

## Roadmap

| Phase | What |
|-------|------|
| 1 | Read — Provenance, holder history, collection stats |
| 2 | Track — Watchlists, alerts, portfolio views |
| 3 | Trade — List, bid, buy via natural language (transaction fees) |

## Why Now

- MCP adoption is accelerating (Claude, ChatGPT, VS Code, Cursor)
- Agent Skills just launched as an open standard
- NFT market has shifted from speculation to utility — provenance *is* utility
- No one else is building narrative AI for NFTs

---

**moonrunners.io** — Flagship experience, live now  
**nftmcp.xyz** — Infrastructure platform, coming soon

---

*December 2025*
