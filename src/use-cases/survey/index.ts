import { MultipartFile } from "@fastify/multipart";

import { SurveyRepository } from "../../repositories/survey.repository";

import { createSurveyUseCase } from "./create.use-case";
import { votingIntentionUseCase } from "./voting-intention.use-case";

export class SurveyUseCases {
  private surveyRepository: SurveyRepository;

  constructor(repository: SurveyRepository) {
    this.surveyRepository = repository;
  }

  async createSurvey(surveyFile?: MultipartFile) {
    return createSurveyUseCase(this.surveyRepository, surveyFile);
  }

  async votingIntention() {
    return votingIntentionUseCase(this.surveyRepository);
  }
}
