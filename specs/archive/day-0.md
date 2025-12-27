# Day 0: Monorepo Setup

## Overview

Setting up a new monorepo for the Moonrunners multi-agent system.

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Backend | Next.js only | Simpler, API routes + server actions |
| Agents | Multiple, managed | Like Eliza - admin backend for agent configs |
| Agent SDK | Claude Agent SDK | Anthropic's official tooling |

## Agent Roadmap

1. **Web UI Chat** - First priority, admin + user-facing chat
2. **Discord Bot** - Community engagement
3. **Twitter Bot** - Social presence (future)

---

## Proposed Structure

```
/repos
├── pnpm-workspace.yaml
├── package.json            # Root workspace config
├── turbo.json              # Optional: build orchestration
│
├── .claude/
│   └── skills/             # Claude Skills (portable, shared)
│       ├── moonspeaker-pack/
│       ├── lore-master/
│       └── ethereum-analyst/
│
├── apps/
│   └── web/                # Next.js - UI + API + Agent runtime
│       ├── src/
│       │   ├── app/
│       │   │   ├── (chat)/         # Chat UI routes
│       │   │   ├── (admin)/        # Agent management dashboard
│       │   │   └── api/
│       │   │       ├── chat/       # Chat endpoint
│       │   │       └── agents/     # Agent CRUD
│       │   ├── agents/             # Agent definitions
│       │   │   ├── base.ts         # Base agent class
│       │   │   ├── web-chat.ts     # Web chat agent
│       │   │   └── discord.ts      # Discord agent (future)
│       │   ├── tools/              # Shared agent tools
│       │   └── lib/
│       ├── package.json
│       └── tsconfig.json
│
└── packages/
    └── shared/             # Shared types, utils, schema
        ├── src/
        │   ├── schema/     # Drizzle schema
        │   │   └── conversations.ts
        │   ├── types/
        │   └── utils/
        ├── drizzle.config.ts
        ├── package.json
        └── tsconfig.json
```

## Why This Structure?

- **Single deployable** - One Next.js app handles everything
- **Agent definitions in code** - Version controlled, not database config
- **Admin dashboard** - Manage agents, view logs, test prompts
- **Scales later** - Can extract agent runtime to separate service if needed

---

## Claude Skills Directory

Claude Skills are portable, self-contained packages that define agent personalities and capabilities. They live at `.claude/skills/` and are loaded via `settingSources: ['project']` in the Agent SDK.

```
/repos
├── .claude/
│   └── skills/                          # Claude Skills (portable)
│       ├── moonspeaker-pack/
│       │   ├── SKILL.md                 # Core personality + instructions
│       │   ├── scripts/
│       │   │   ├── get_holder_context.py
│       │   │   └── get_nft_biography.py
│       │   └── references/
│       │       ├── voice-guide.md
│       │       └── primordia-lore.md
│       ├── lore-master/
│       │   ├── SKILL.md
│       │   └── references/
│       └── ethereum-analyst/
│           ├── SKILL.md
│           └── scripts/
```

### Skill Structure

Each skill folder contains:

| File/Folder | Purpose |
|-------------|---------|
| `SKILL.md` | Personality, voice, instructions, capabilities |
| `scripts/` | Executable tools (Python/TS) the skill can invoke |
| `references/` | Context docs loaded on demand (lore, guides) |
| `assets/` | Optional images, audio samples |

### Why Skills vs Code-Only Agents?

- **Portability** - Skills work in Claude.ai, Claude Code, VS Code, Cursor
- **Progressive disclosure** - Only loads what's needed per conversation
- **Industry standard** - Adopted by Microsoft, OpenAI Codex, Cursor
- **Contribution-ready** - Can publish to community skill repos

---

## Day 0 Checklist

### Setup
- [ ] Create `/repos` directory
- [ ] Initialize pnpm workspace
- [ ] Create `apps/web` (Next.js 16)
- [ ] Create `packages/shared`
- [ ] Configure TypeScript paths

### Database Setup
- [ ] Install Drizzle ORM + `better-sqlite3` (local) + `@vercel/postgres`
- [ ] Create schema in `packages/shared/src/schema/`
- [ ] Configure `drizzle.config.ts` for SQLite/Postgres switching
- [ ] Create Vercel Postgres database
- [ ] Run initial migration

### Skills Setup
- [ ] Create `.claude/skills/` directory
- [ ] Create first skill: `moonspeaker-pack/SKILL.md`
- [ ] Add basic `references/voice-guide.md`

### Auth & Rate Limiting
- [ ] Integrate Reown AppKit for wallet auth
- [ ] Create `visitorId` generation (cookie + IP hash)
- [ ] Implement `checkRateLimit()` middleware
- [ ] Add NFT ownership check for holder tier
- [ ] UI: Show remaining messages, upgrade prompts

### First Agent
- [ ] Install Claude Agent SDK (`@anthropic-ai/claude-code`)
- [ ] Create base agent with `settingSources: ['project']`
- [ ] `/api/chat` endpoint with rate limiting
- [ ] Basic chat UI

### Admin (Minimal)
- [ ] List agents page
- [ ] Agent status/health
- [ ] Test chat interface

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Agent SDK | Claude Agent SDK (`@anthropic-ai/claude-code`) |
| Skills | `.claude/skills/` with SKILL.md format |
| Database | Vercel Postgres (prod) / SQLite (local) + Drizzle |
| Auth | Reown AppKit (wallet), Email/Patreon in v2 |
| Rate Limiting | Tiered by user type (anonymous → holder → patron) |

---

## Conversation History

Store conversation history in the database for continuity across sessions.

### Schema (Drizzle)

```typescript
// packages/shared/src/schema/index.ts

// Users & Auth
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  walletAddress: text('wallet_address').unique(),
  patreonId: text('patreon_id').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Conversations
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  visitorId: text('visitor_id'),                 // Anonymous users
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id),
  role: text('role').notNull(),                  // 'user' | 'assistant'
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Usage Tracking (for rate limiting)
export const usageTracking = pgTable('usage_tracking', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  visitorId: text('visitor_id'),                 // Anonymous users
  messageCount: integer('message_count').default(0),
  periodStart: timestamp('period_start'),        // Reset daily
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Environment Strategy

| Environment | Database | Connection |
|-------------|----------|------------|
| Local | SQLite | `file:./local.db` |
| Preview | Vercel Postgres | `POSTGRES_URL` |
| Production | Vercel Postgres | `POSTGRES_URL` |

Drizzle handles both via dialect switching in `drizzle.config.ts`.

---

## Rate Limiting

Tiered freemium model with incentives for holders and patrons.

### Tiers

| Tier | Identity | Messages/Day | Enforcement |
|------|----------|--------------|-------------|
| Anonymous | Cookie + IP fingerprint | 5 | `visitorId` in session |
| Registered | Email/SSO/Wallet | 25 | `userId` |
| Holder | Verified NFT owner | 50 + (10 × NFT count) | On-chain verification |
| Patron | Patreon subscriber | Unlimited | Patreon OAuth (v2) |

### Enforcement

```typescript
// apps/web/src/lib/rate-limit.ts

export async function checkRateLimit(req: Request) {
  const user = await getUser(req);
  const tier = await getUserTier(user);  // Check NFTs, Patreon status
  const usage = await getUsage(user);

  if (usage.messageCount >= tier.limit) {
    return {
      allowed: false,
      reason: `Daily limit reached (${tier.limit} messages)`,
      upgradeHint: tier.upgradeHint,
    };
  }

  await incrementUsage(user);
  return {
    allowed: true,
    remaining: tier.limit - usage.messageCount,
  };
}

async function getUserTier(user: User | Visitor) {
  if (!user.id) return TIERS.anonymous;
  if (user.patreonId) return TIERS.patron;

  const nftCount = await getNFTCount(user.walletAddress);
  if (nftCount > 0) {
    return { ...TIERS.holder, limit: 50 + (10 * nftCount) };
  }

  return TIERS.registered;
}
```

### v1 Scope

- [x] Anonymous tracking (cookie/IP)
- [x] Wallet-based auth (Reown AppKit)
- [x] Holder verification (on-chain NFT check)
- [ ] Email/password auth (v2)
- [ ] Patreon OAuth (v2)

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Agent config | Code-only (v1) | Type-safe, version controlled, faster to ship. Can migrate to DB later if non-devs need to edit prompts. |
| Bot tokens | Vercel Env Vars | Static secrets, encrypted at rest, no need for Edge Config complexity. |
| Rate limiting | Tiered by user type | Freemium model with holder/patron incentives. |
| Auth | Wallet (v1), Email + Patreon (v2) | Wallet connect already exists, layer in others later. |

---

## Next: Day 1

1. Bootstrap the monorepo
2. "Hello Claude" - single agent, single endpoint
3. Minimal chat UI that works
