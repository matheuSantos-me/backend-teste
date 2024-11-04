import { Survey } from "@prisma/client";

export interface Repository {
  findSurvey: () => Promise<Survey[]>;
  createSurvey: (data: CreateSurvey[]) => Promise<Survey[]>;
  deleteManyBySurveyId: (surveyId: string) => Promise<[]>;
}

export interface CreateSurvey {
  surveyId: string;
  surveyDate: string;
  municipality: string;
  state: string;
  votingIntention: string;
}
