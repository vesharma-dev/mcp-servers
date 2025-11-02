# MCP Servers Monorepo

This repository is a monorepo containing multiple implementations of Model Context Protocol (MCP) servers in different languages and frameworks. Each subproject demonstrates how to build an MCP-compatible server using popular technologies.

## Projects

- **mcps/mcp-with-express**: TypeScript + Express.js
  - Modern Node.js server using TypeScript and Express.
  - Features streamable HTTP transport via the MCP SDK.
  - Includes build scripts and Vercel deployment configuration.

- **mcps/mcp-with-fastapi**: Python + FastAPI
  - High-performance Python server using FastAPI.
  - Designed for rapid development and easy deployment.

- **mcps/mcp-with-gin**: Go + Gin
  - Lightweight Go server using the Gin framework.
  - Suitable for scalable and fast backend services.

## Structure

```
mcps/
  mcp-with-express/   # TypeScript + Express implementation
  mcp-with-fastapi/   # Python + FastAPI implementation
  mcp-with-gin/       # Go + Gin implementation
```

## Getting Started

Each subproject is self-contained. Refer to the README in each subdirectory for setup and usage instructions.

### Example: Express Server

```
cd mcps/mcp-with-express
pnpm install
pnpm run build
pnpm start
```

### Example: FastAPI Server

```
cd mcps/mcp-with-fastapi
# Setup your Python environment and run the server
```

### Example: Gin Server

```
cd mcps/mcp-with-gin
# Build and run your Go server
```

## Deployment

- Each subproject can be deployed independently (e.g., to Vercel, AWS, etc.).
- See the `vercel.json` in each subproject for Vercel deployment configuration.

## License

MIT

---

For more details, see the documentation in each subproject.
