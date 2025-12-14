import type { Server as HttpServer } from "http";
import type { Express } from "express";

export const startHttpServer = async (
  app: Express,
  port: number
): Promise<HttpServer> =>
  await new Promise<HttpServer>((resolve, reject) => {
    const server = app
      .listen(port, () => {
        console.log(`MCP Streamable HTTP Server listening on port ${port}`);
        resolve(server);
      })
      .on("error", (error) => {
        console.error("Failed to start server:", error);
        reject(error);
      });
  });
