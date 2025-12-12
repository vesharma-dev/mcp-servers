import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServer } from "../utils/create-server.utils.js";

export const connectMcpServer = async (
  transport: StreamableHTTPServerTransport
): Promise<McpServer> => {
  const { server } = createServer();

  try {
    await server.connect(transport);
    console.log("Server connected successfully");
  } catch (error) {
    console.error("Failed to set up the server:", error);
    throw error;
  }

  return server;
};
