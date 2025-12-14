import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MCP_SERVER_CONFIG } from "../constants/server.constants.js";

// Create MCP server instance
export const server = new McpServer(MCP_SERVER_CONFIG);
