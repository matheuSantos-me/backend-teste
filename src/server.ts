import "dotenv/config";

import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

import { surveyRoutes } from "./routes/survey.routes";

const server: FastifyInstance = Fastify({ logger: true });

server.register(cors, { origin: "*" });
server.register(fastifyMultipart);

server.register(surveyRoutes);

const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen({ port: Number(PORT) }, (err) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }

      console.log(`Server listening at ${PORT}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
