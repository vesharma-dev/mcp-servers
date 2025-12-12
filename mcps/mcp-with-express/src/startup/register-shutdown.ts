import type { Server as HttpServer } from "http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface ShutdownOptions {
  httpServer: HttpServer;
  transport: StreamableHTTPServerTransport;
  mcpServer: McpServer;
}

export const registerShutdown = ({
  httpServer,
  transport,
  mcpServer,
}: ShutdownOptions): void => {
  const handleShutdown = async () => {
    console.log("Shutting down server...");

    try {
      console.log("Closing transport");
      await transport.close();
    } catch (error) {
      console.error("Error closing transport:", error);
    }

    try {
      await mcpServer.close();
      console.log("Server shutdown complete");
    } catch (error) {
      console.error("Error closing server:", error);
    }

    try {
      await new Promise<void>((resolve, reject) => {
        httpServer.close((closeError) => {
          if (closeError) {
            reject(closeError);
            return;
          }
          resolve();
        });
      });
    } catch (error) {
      console.error("Error closing HTTP server:", error);
    }

    process.exit(0);
  };

  process.on("SIGINT", () => {
    void handleShutdown();
  });
};
