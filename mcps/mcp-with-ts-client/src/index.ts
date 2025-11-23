import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./create-server.js";

async function main() {
  const { server } = createServer();
  const transport = new StdioServerTransport();

  const shutdown = async () => {
    console.log("Shutting down MCP server...");
    try {
      await transport.close();
    } catch (error) {
      console.error("Error closing transport:", error);
    }

    try {
      await server.close();
    } catch (error) {
      console.error("Error closing server:", error);
    }
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await server.connect(transport);
  console.log("Weather MCP server ready on stdio transport.");
}

main().catch((error) => {
  console.error("Failed to start MCP server:", error);
  process.exit(1);
});
