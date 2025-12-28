# MR-Agents v1 — Moonspeaker Chat Implementation

**Status:** Implemented
**Date:** 2025-12-26
**Repository:** `/mr-agents`

## Overview

MR-Agents v1 is a proof-of-concept AI chat interface featuring "Kira," a mystical wolf spirit Moonspeaker from the Moonrunners universe. Built using the Claude Agent SDK, it demonstrates Claude Skills integration with a custom Next.js frontend.

## Architecture

### Monorepo Structure

```
mr-agents/
├── .claude/
│   └── skills/
│       └── moonspeaker-pack/      # Kira personality skill
│           ├── SKILL.md           # Skill definition
│           └── references/
│               └── voice-guide.md # Speech patterns
├── apps/
│   └── web/                       # Next.js 15 frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/chat/route.ts  # SSE streaming endpoint
│       │   │   ├── globals.css        # Chat UI styles
│       │   │   ├── layout.tsx         # Root layout w/ fonts
│       │   │   └── page.tsx           # Home page
│       │   └── components/
│       │       └── MoonspeakerChat.tsx # Chat component
│       └── public/
│           └── parallax/          # Background assets
├── packages/
│   └── shared/                    # Shared types & schema
│       └── src/
│           ├── schema/index.ts    # Drizzle DB schema
│           └── types/index.ts     # TypeScript types
├── pnpm-workspace.yaml
├── turbo.json
└── CLAUDE.md
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Build System | pnpm workspaces + Turborepo |
| Frontend | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS + custom CSS variables |
| Agent | Claude Agent SDK v0.1.76 |
| Streaming | Server-Sent Events (SSE) |
| Markdown | react-markdown + remark-gfm |
| Database (schema only) | Drizzle ORM (PostgreSQL) |

## Key Components

### 1. Claude Skill: `moonspeaker-pack`

Located in `.claude/skills/moonspeaker-pack/SKILL.md`

Defines Kira's personality:
- **Tribe:** Pack (values bonds and community)
- **Voice:** Warm, mysterious, timeless
- **Behaviors:** Greets visitors, shares lore, deflects off-topic questions
- **Boundaries:** Stays in character, avoids financial advice, doesn't break fourth wall

The skill is loaded via `settingSources: ['project']` in the API route.

### 2. Chat API (`/api/chat`)

Server-side streaming endpoint using the Claude Agent SDK:

```typescript
for await (const agentMessage of query({
  prompt: message,
  options: {
    settingSources: ["project"],  // Load skills from .claude/skills/
    systemPrompt: `You are Kira, the Pack Moonspeaker...`,
    allowedTools: ["Read", "Glob", "Grep"],
    permissionMode: "bypassPermissions",
  },
})) {
  // Stream formatted messages via SSE
}
```

**Features:**
- SSE streaming for real-time responses
- Tool activity reporting (with flavor text like "Consulting the ancient scrolls...")
- Error handling with graceful degradation

### 3. Chat UI (`MoonspeakerChat.tsx`)

React component with:
- **Terminal-style input** — `>` prompt, no borders, auto-focus
- **Message bubbles** — Differentiated user/assistant styling
- **Markdown rendering** — Tables, code blocks, lists via react-markdown
- **Tool activity indicators** — Spinner with mystical descriptions
- **Parallax background** — Pixelated moon, mountains, starfield

### 4. Visual Design

- **Typography:** Cinzel (display) + Source Sans 3 (body)
- **Color palette:** Deep purple (#1C0D36) base with lavender accents
- **Background:** Pixelated parallax layers (bg.png, moon.png, mountains.png)
- **Input:** Terminal aesthetic with blinking cursor effect

### 5. Database Schema (Prepared)

Drizzle schema for future implementation:

| Table | Purpose |
|-------|---------|
| `users` | Auth (email, wallet, Patreon) |
| `conversations` | Chat sessions |
| `messages` | Message history with tool calls |
| `usage_tracking` | Rate limiting per user/visitor |

## What's Working

- [x] Claude Agent SDK integration
- [x] Skill loading from `.claude/skills/`
- [x] SSE streaming responses
- [x] Markdown rendering (including tables)
- [x] Tool activity indicators
- [x] Terminal-style input with auto-focus
- [x] Parallax background
- [x] Mobile responsive layout

## What's Not Implemented (v1 Scope)

- [ ] Database persistence (schema exists, not connected)
- [ ] User authentication (wallet, email, Patreon)
- [ ] Rate limiting enforcement
- [ ] Conversation history
- [ ] Multiple agent personalities
- [ ] Commands system (`/` commands mentioned in UI)

## Running Locally

```bash
cd mr-agents
pnpm install
pnpm dev
# Visit http://localhost:3001
```

Requires `ANTHROPIC_API_KEY` environment variable.

## Relationship to Day-0 Spec

This implementation diverged from the original day-0.md spec in scope:

| Day-0 Spec | v1 Implementation |
|------------|-------------------|
| Multi-agent with tribe selection | Single agent (Kira/Pack) |
| Full auth flow | No auth |
| Database integration | Schema only |
| Rate limiting | UI placeholder only |
| Vercel deployment | Local dev only |

The v1 serves as a **technical proof-of-concept** demonstrating:
1. Claude Agent SDK works with Next.js 15
2. Skills can be loaded from project directory
3. SSE streaming provides good UX
4. The Moonspeaker persona is compelling

## Next Steps (v2)

1. Connect Drizzle schema to Vercel Postgres
2. Implement wallet authentication
3. Add rate limiting middleware
4. Persist conversation history
5. Deploy to Vercel
6. Add additional tribe personalities
