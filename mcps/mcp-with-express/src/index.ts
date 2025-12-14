import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createApp } from "./app/create-app.js";
import { loadServerConfig } from "./config/server.config.js";
import { createMcpRouter } from "./routes/mcp.routes.js";
import { connectMcpServer } from "./startup/connect-mcp-server.js";
import { registerShutdown } from "./startup/register-shutdown.js";
import { startHttpServer } from "./startup/start-http-server.js";

// Re-export express for Vercel detection
export { express };

const config = loadServerConfig();

// Initialize transport
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined, // set to undefined for stateless servers
});

// Create application
const app = createApp({
  routes: [createMcpRouter(transport)],
});

const bootstrap = async () => {
  const mcpServer = await connectMcpServer(transport);
  const httpServer = await startHttpServer(app, config.port);

  registerShutdown({
    httpServer,
    transport,
    mcpServer,
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
