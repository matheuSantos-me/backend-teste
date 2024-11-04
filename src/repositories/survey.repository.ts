import { Survey } from "@prisma/client";
import { db } from "../db";

import { Repository, CreateSurvey } from "../models/survey.model";

export class SurveyRepository implements Repository {
  async findSurvey(): Promise<Survey[]> {
    const survey = await db.survey.findMany({
      orderBy: { surveyId: "asc" },
    });

    return survey;
  }

  async createSurvey(data: CreateSurvey[]): Promise<Survey[]> {
    const survey = await db.survey.createManyAndReturn({ data });

    return survey;
  }

  async deleteManyBySurveyId(surveyId: string): Promise<[]> {
    await db.survey.deleteMany({ where: { surveyId } });

    return [];
  }
}
