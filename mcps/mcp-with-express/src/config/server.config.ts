import dotenv from "dotenv";

export interface ServerConfig {
  port: number;
}

const DEFAULT_PORT = 3000;

export const loadServerConfig = (): ServerConfig => {
  dotenv.config();

  const portValue = process.env.PORT;
  const parsedPort = portValue ? Number(portValue) : DEFAULT_PORT;

  if (Number.isNaN(parsedPort) || parsedPort <= 0) {
    throw new Error(
      `Invalid PORT environment value: ${portValue}. Expected a positive integer.`
    );
  }

  return { port: parsedPort };
};
