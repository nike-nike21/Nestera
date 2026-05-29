This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

> **Important**: This project exclusively uses `pnpm`. Please do not use `npm` or `yarn` to avoid lockfile conflicts.

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```bash
# Application URLs
NEXT_PUBLIC_BASE_URL=https://nestera.app

# Stellar Network URLs
NEXT_PUBLIC_HORIZON_PUBLIC_URL=https://horizon.stellar.org
NEXT_PUBLIC_HORIZON_TESTNET_URL=https://horizon-testnet.stellar.org

# CoinGecko API (for price feeds)
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3

# Social Media Links
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/nestera
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/nestera
NEXT_PUBLIC_GITHUB_URL=https://github.com/nestera
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/nestera
```

A `.env.example` file is provided with all required variables. Copy it to `.env.local` and update the values as needed for your environment.
