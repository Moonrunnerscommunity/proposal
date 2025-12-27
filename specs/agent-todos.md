# MR-Agents Development Plan

## How the Read-Only Tools Work

The Agent SDK has built-in tools. When you set `allowedTools: ["Read", "Glob", "Grep"]`:

- **Read** - Claude can read any file by path (e.g., `Read({ file_path: "/path/to/lore.md" })`)
- **Glob** - Claude can search for files by pattern (e.g., `Glob({ pattern: "**/*.md" })`)
- **Grep** - Claude can search file contents (e.g., `Grep({ pattern: "Pack tribe" })`)

This means Moonspeaker can look up information on-demand if you give it files to search through.

---

## How to Give Moonspeaker Knowledge

### Option 1: Skill References (Static Context)
Files in `.claude/skills/moonspeaker-pack/references/` are loaded as skill context:
```
references/
├── voice-guide.md      # (exists) speech patterns
├── lore-tribes.md      # add: tribe descriptions
├── lore-primordia.md   # add: world history
├── faq.md              # add: common questions
└── nft-collections.md  # add: collection info
```
**Pros:** Always available, no tool calls needed
**Cons:** Increases token usage on every message

### Option 2: Knowledge Directory (Tool-Based Lookup)
Create a searchable knowledge base the agent can query:
```
.claude/knowledge/
├── tribes/
│   ├── pack.md
│   ├── hunters.md
│   └── ...
├── history/
│   ├── first-moon.md
│   └── third-moon-crisis.md
└── collections/
    ├── moonrunners.md
    └── dragonhorde.md
```
**Pros:** Scales better, only loads what's needed
**Cons:** Requires tool calls, slight latency

### Option 3: Hybrid
- Put essential info (voice, core lore) in references/
- Put detailed/searchable info in knowledge/
- Update system prompt to tell agent where to look

---

## Priority Roadmap

### Phase 1: Knowledge & Personality (Current Focus)
- [ ] Modernize Kira's voice (less fantasy cringe, more chill)
- [ ] Update SKILL.md with new personality
- [ ] Add lore files to references/ or knowledge/
- [ ] Add collection info (Moonrunners, Dragonhorde, etc.)
- [ ] Test that agent can retrieve knowledge via tools

### Phase 2: Persistence & Auth
- [ ] Connect Drizzle schema to database (Vercel Postgres or local)
- [ ] Implement conversation history storage
- [ ] Add wallet connect (wagmi/viem)
- [ ] Detect NFT holder status on-chain
- [ ] Implement rate limiting (free tier vs holder tier)

### Phase 3: Multi-Agent
- [ ] Create additional tribe Moonspeakers
- [ ] Add agent selection UI (or auto-detect from NFT)
- [ ] Shared knowledge base, different personalities

### Phase 4: Commands & Features
- [ ] Implement `/` command system
- [ ] `/lore` - deep dive into specific topics
- [ ] `/tribe` - switch or learn about tribes
- [ ] `/collection` - NFT collection info
- [ ] `/clear` - reset conversation

### Phase 5: Production
- [ ] Deploy to Vercel
- [ ] Set up proper environment variables
- [ ] Add error monitoring (Sentry)
- [ ] Analytics for usage patterns
- [ ] Rate limit enforcement

---

## Immediate Next Steps

1. **Fix Kira's personality** - Update SKILL.md to be more modern/chill
2. **Add a knowledge file** - Start with `references/lore-overview.md`
3. **Test tool usage** - Verify agent can Read files when asked about lore
4. **Update system prompt** - Remove the cringe, tell it to search knowledge/

---

## Technical Notes

### Current API Route Setup
```typescript
query({
  prompt: message,
  options: {
    settingSources: ["project"],           // loads skills from .claude/skills/
    systemPrompt: "...",                   // defines agent role
    allowedTools: ["Read", "Glob", "Grep"], // read-only file access
    permissionMode: "bypassPermissions",   // server-side, no user prompts
  },
})
```

### Adding More Tools
To let agent do more, expand `allowedTools`:
- `WebSearch` - search the web
- `WebFetch` - fetch URLs
- `Bash` - run commands (careful with this one)

### Environment Variables Needed
- `ANTHROPIC_API_KEY` - required for Agent SDK
- `DATABASE_URL` - for Drizzle/Postgres (Phase 2)
- `NEXT_PUBLIC_WALLETCONNECT_ID` - for wallet connect (Phase 2)
