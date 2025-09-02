# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for the Moonrunners Community Takeover Proposal. It includes:
- A voting/proposal website for community governance
- NFT unstaking functionality for Primordia Land, Moonrunners, and Dragonhorde collections
- Audit tracking system for community assets
- Web3 integration using Reown AppKit (formerly WalletConnect) and wagmi

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with custom animations
- **Web3**: Reown AppKit, wagmi, viem, ethers
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **State Management**: React Query (TanStack Query)

### Project Structure

#### Core Directories
- `/src/app/` - Next.js App Router pages and API routes
  - Main pages: home (`page.tsx`), unstake portal (`/unstake`), audit page (`/audit`)
  - API routes for OpenSea proxy and audit note updates
- `/src/components/` - React components organized by feature
  - Main sections: HeroSection, TeamSection, OperationalSection, etc.
  - `/unstake/` - Unstaking portal components (NFTCard, NFTGrid, TransactionModal)
  - `/operational/` - Operational handover components (contracts, domains, social accounts)
  - `/ui/` - Reusable UI components
- `/src/config/` - Configuration data (contracts, social accounts, team members)
- `/src/hooks/` - Custom React hooks for wallet connection and NFT staking
- `/src/lib/` - Utility functions and Web3 setup

#### Scripts Directory
- `/scripts/` - Standalone TypeScript scripts for:
  - `audit.ts` - Auditing wallet holdings and NFT ownership
  - `ens.ts` - ENS domain verification
  - Associated JSON files store results and checkpoints

### Web3 Integration

The application uses two main smart contracts:
1. **Primordia Contract** (`0x9972edce48d82d16c82326e23f894f9aa0e3bb32`)
   - Uses `tokensOfOwner()` to get staked NFTs
   - `unStake()` method for unstaking

2. **Moonrunners/Dragonhorde Contract** (`0x717C6dD66Be92E979001aee2eE169aAA8D6D4361`)
   - Uses `getStake()` to retrieve staked NFTs
   - `unstake()` method for unstaking

### Key Patterns

1. **Component Organization**: Features are organized into self-contained sections with clear separation between UI and business logic

2. **Web3 Hooks**: Custom hooks (`useWallet`, `useStakedNFTs`) abstract Web3 complexity

3. **Parallel Data**: Components use React Scroll Parallax for visual effects on the main page

4. **Type Safety**: Strict TypeScript with Zod schemas for validation

5. **Path Aliases**: Uses `@/` alias for absolute imports from `/src/`

### Environment Variables

Required:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Reown/WalletConnect project ID for wallet connections

### Development Notes

- The app uses Next.js 15's Turbopack for faster development builds
- Tailwind CSS v4 is configured with custom animations
- Images from OpenSea are proxied through `/api/opensea-proxy` to handle CORS
- The audit system tracks community asset transfers with persistent JSON storage