# TypeScript MCP Weather Server (stdio)

This mini-project shows how to build a Model Context Protocol (MCP) server in TypeScript that talks to desktop MCP clients over the stdio transport. It reuses the same weather tools as the Express example but packages them for local CLI/desktop integration instead of HTTP.

## Features

- ✅ Written in TypeScript with strict type-checking
- ✅ Uses `StdioServerTransport` so MCP hosts like Claude Desktop or Cursor can spawn it directly
- ✅ Provides the same `get-alerts` and `get-forecast` tools backed by the NWS public API
- ✅ Includes ready-to-run scripts for development, builds, and production execution

## Prerequisites

- Node.js 18+ (built-in `fetch` support is required)
- [pnpm](https://pnpm.io) 8+

## Installation

```bash
cd mcps/mcp-with-ts-client
pnpm install
```

## Development

```bash
pnpm run dev
```

Runs the MCP server directly with `tsx`, emitting JSON-RPC over stdio. Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) or another MCP-compatible client to connect via stdio.

## Build & Run

```bash
pnpm run build
pnpm run start
```

- `build` compiles TypeScript into `dist/`
- `start` executes the generated JavaScript with Node.js

## Using with MCP clients

1. Run `pnpm run dev` (or `pnpm run start` after a build).
2. Configure your MCP-enabled desktop client to launch `node dist/index.js` (or `pnpm run dev`) as a stdio tool provider.
3. Invoke the `get-alerts` or `get-forecast` tools from the client.

For quick testing you can also run:

```bash
pnpm dlx @modelcontextprotocol/inspector --command "pnpm run dev"
```

This spawns the Inspector and launches the stdio server using your local project scripts.

## Project layout

```
mcps/mcp-with-ts-client/
├── package.json      # Scripts and dependencies
├── tsconfig.json     # Compiler options
├── README.md         # This guide
├── src/
│   ├── create-server.ts  # Weather tool definitions
│   └── index.ts          # stdio transport bootstrap
└── dist/ (generated)
```

## Relationship to the Express example

- `mcp-with-express` demonstrates hosting the MCP server behind an HTTP endpoint for web clients.
- `mcp-with-ts-client` focuses on stdio transport, which is what local desktop hosts expect.
- Both share the same weather functionality so you can compare deployment models.
