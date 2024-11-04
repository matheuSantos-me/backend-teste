import { FastifyReply, FastifyRequest } from "fastify";

import { SurveyUseCases } from "../../use-cases/survey";

import { SurveyRepository } from "../../repositories/survey.repository";

import { AppError, AppMessages } from "../../constants/survey";
import AppResult from "../../utils/app-result";
import { FriendlyError } from "../../utils/friendly-error";

export const createSurveyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const surveyFileCSV = await request.file();

  const surveyRepository = new SurveyRepository();
  const surveyUseCases = new SurveyUseCases(surveyRepository);

  try {
    const survey = await surveyUseCases.createSurvey(surveyFileCSV);

    const result = new AppResult(
      AppMessages.CREATE_SURVEY_SUCCESS,
      survey,
      200
    );

    return reply.code(result.getStatusCode()).send(result);
  } catch (error: unknown) {
    if (error instanceof FriendlyError) {
      const result = new AppResult((error as FriendlyError).message, null, 400);

      return reply.code(result.getStatusCode()).send(result);
    } else {
      const result = new AppResult(AppError.INTERNAL_SERVER_ERROR, null, 500);

      return reply.code(result.getStatusCode()).send(result);
    }
  }
};
