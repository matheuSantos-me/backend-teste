import { MultipartFile } from "@fastify/multipart";
import { PassThrough } from "stream";
import csv from "csv-parser";
import iconv from "iconv-lite";

import { SurveyRepository } from "../../repositories/survey.repository";

import { AppError } from "../../constants/survey";
import { FriendlyError } from "../../utils/friendly-error";
import { CreateSurvey } from "../../models/survey.model";

export async function createSurveyUseCase(
  surveyRepository: SurveyRepository,
  surveyFile?: MultipartFile
) {
  if (!surveyFile || !surveyFile.file) {
    throw new FriendlyError({
      message: AppError.FILE_NOT_SEND_ERROR,
      context: "createSurveyUseCase",
    });
  }

  if (surveyFile.mimetype !== "text/csv") {
    throw new FriendlyError({
      message: AppError.FILE_SEND_NOT_CSV_ERROR,
      context: "createSurveyUseCase",
    });
  }

  const results: CreateSurvey[] = [];
  const passThrough = new PassThrough();

  surveyFile.file.pipe(passThrough);

  passThrough
    .pipe(iconv.decodeStream("latin1"))
    .pipe(csv({ separator: ";", headers: false, skipLines: 1 }))
    .on("data", (data) => {
      const isValid = (value: string) => value && value !== "#N/D";

      if (isValid(data[2]) && isValid(data[3]) && isValid(data[4])) {
        results.push({
          surveyId: data[0],
          surveyDate: data[1],
          municipality: data[2],
          state: data[3],
          votingIntention: data[4],
        });
      }
    })
    .on("end", async () => {
      try {
        await surveyRepository.deleteManyBySurveyId(results[0].surveyId);

        const survey = await surveyRepository.createSurvey(results);

        return survey;
      } catch (error) {
        throw new FriendlyError({
          message: AppError.CREATE_SURVEY_ERROR,
          originalError: error,
          context: "createBrandUseCase",
        });
      }
    })
    .on("error", () => {
      throw new FriendlyError({
        message: AppError.FILE_SEND_NOT_CSV_ERROR,
        context: "createSurveyUseCase",
      });
    });
}
