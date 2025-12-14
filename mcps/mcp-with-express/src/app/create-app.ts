import cors from "cors";
import express, { Express, Router } from "express";
import path from "path";

const corsConfig: cors.CorsOptions = {
  origin: true,
  methods: "*",
  allowedHeaders: "Authorization, Origin, Content-Type, Accept, *",
};

export interface CreateAppOptions {
  routes?: Router[];
}

export const createApp = ({ routes = [] }: CreateAppOptions = {}): Express => {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));
  app.use(cors(corsConfig));
  app.options("*", cors(corsConfig));

  routes.forEach((router) => app.use(router));

  return app;
};
