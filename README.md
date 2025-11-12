# AI Token Studio

A Next.js application for generating and deploying token metadata and imagery (AI-assisted), with Solana wallet integration.

This README gives a concise, practical guide to running the project locally, configuring RPC providers, and troubleshooting common issues (including JSON-RPC 403 responses).

## Table of contents

- [What is this](#what-is-this)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Local development](#local-development)
- [Production / Deployment notes](#production--deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## What is this

AI Token Studio is a developer UI and backend for crafting token metadata and images using AI, connecting to Solana wallets (Phantom / Solflare), and optionally deploying through third-party services. It includes server-side API routes, an image/metadata generation flow, and a server-side RPC proxy to avoid exposing API keys or hitting public RPC rate limits.

## Features

- Generate token metadata (name, symbol, descriptions) using a chat model.
- Generate picture & cover images using an image API.
- Wallet integration: sign messages with Phantom / Solflare.
- Server-side proxy endpoint for safe Solana RPC calls: `POST /api/rpc/balance`.
- Store deploy records in Postgres when `DATABASE_URL` is configured.

## Prerequisites

- Node.js (recommended version >= 18)
- pnpm or npm (this project uses pnpm in examples)
- A Solana RPC provider (recommended: QuickNode, Helius, Alchemy, Blast) if you need reliable balance/RPC calls
- Optional: a PostgreSQL instance if you want to persist deploys

## Environment variables

Create a `.env.local` in the project root with the variables you need. Important variables used by the app:

- `SOLANA_RPC_URL` (server-only) — URL of your Solana RPC endpoint used by the server-side proxy. Example: `https://rpc.myprovider.example`.
- `SOLANA_RPC_KEY` (server-only, optional) — API key for your RPC provider. The proxy will include it as `Authorization: Bearer <key>`.
- `NEXT_PUBLIC_SOLANA_RPC` (client) — optional client-side fallback RPC. Prefer server proxy instead of using this in production.
- `DATABASE_URL` — Postgres connection string (used by `app/api/deploy/route.ts`).
- `PUMP_FUN_API_URL` / `PUMP_FUN_API_KEY` — optional, used by the deploy route when interacting with the Pump.fun API.
- `OPENAI_API_KEY` — required if you want server-side image/metadata generation to call OpenAI.
- `OPENAI_CHAT_MODEL` / `OPENAI_IMAGE_MODEL` — optional model overrides used by the generate route.

Notes:
- Prefixes that start with `NEXT_PUBLIC_` are exposed to the client. Keep secrets (API keys) server-side using non-prefixed names.

## Local development

1. Install dependencies:

```powershell
pnpm install
```

2. Add `.env.local` with the values from the Environment variables section.

3. Start the development server:

```powershell
pnpm dev
# or
npm run dev
```

4. Open your browser at `http://localhost:3000` and connect your Phantom or Solflare wallet.

## How the balance flow works (avoid 403)

1. Client first attempts to read balance via the injected wallet provider (Phantom/Solflare). That usually avoids public RPC issues because the wallet uses its configured node.
2. If the provider can't return a balance, the client calls the server-side proxy `POST /api/rpc/balance` with `{ publicKey }`.
3. The server-side proxy forwards the JSON-RPC `getBalance` request to the RPC endpoint configured in `SOLANA_RPC_URL`, optionally using `SOLANA_RPC_KEY`. This keeps API keys secret and reduces client-side 403s.
4. Only if the proxy fails will the client fallback to `NEXT_PUBLIC_SOLANA_RPC`.

## Production / Deployment notes

- Deploy to Vercel or your platform of choice. Ensure server-side env vars (e.g., `SOLANA_RPC_URL`, `SOLANA_RPC_KEY`, `DATABASE_URL`) are configured in the host.
- Keep secret keys server-side; do not set `SOLANA_RPC_KEY` as a `NEXT_PUBLIC_` variable.

## Troubleshooting

- JSON-RPC 403 / "Access forbidden":
	- Cause: the RPC provider blocked your request (rate-limiting, IP block, or requires an API key).
	- Fixes:
		1. Configure a reliable RPC in `.env.local` (server-side):
			 - `SOLANA_RPC_URL=https://rpc.your-provider.example`
			 - `SOLANA_RPC_KEY=your_api_key` (if required)
		2. Restart the dev server after updating `.env.local`.
		3. Prefer using the server proxy `/api/rpc/balance` (already wired in the client). If the server proxy still returns 403 from the provider, the provider likely requires a different auth mechanism — consult the provider docs and set the appropriate header in `app/api/rpc/balance/route.ts`.

- Wallet doesn't connect / signatures fail:
	- Make sure your wallet extension is installed and unlocked. Mobile deep links are supported in the client.

- Image generation errors:
	- Ensure `OPENAI_API_KEY` is set and your account has access to the requested image or chat models.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with description and testing steps

## License

This project is provided as-is. Check the project owner for license preferences.

