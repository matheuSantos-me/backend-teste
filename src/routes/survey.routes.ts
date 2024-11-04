import { FastifyInstance } from "fastify";

import {
  createSurveyController,
  votingIntentionController,
} from "../controllers/survey";

export async function surveyRoutes(server: FastifyInstance) {
  server.post("/upload-survey", createSurveyController);

  server.get("/voting-intention", votingIntentionController);
}
