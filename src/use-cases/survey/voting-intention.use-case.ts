import { Survey } from "@prisma/client";

import { SurveyRepository } from "../../repositories/survey.repository";

import { AppError } from "../../constants/survey";
import { FriendlyError } from "../../utils/friendly-error";

interface VotingIntentionResult {
  label: string[];
  percentages: { [intention: string]: number[] };
}

export async function votingIntentionUseCase(
  surveyRepository: SurveyRepository
) {
  function calculateVotingIntentionPercentages(
    surveys: Survey[]
  ): VotingIntentionResult {
    const totalVotes: { [key: string]: number } = {};
    const votingCounts: { [key: string]: { [key: string]: number } } = {};

    surveys.forEach((survey) => {
      const { surveyId, votingIntention } = survey;

      if (!totalVotes[surveyId]) {
        totalVotes[surveyId] = 0;
        votingCounts[surveyId] = {};
      }

      totalVotes[surveyId]++;
      if (!votingCounts[surveyId][votingIntention]) {
        votingCounts[surveyId][votingIntention] = 0;
      }
      votingCounts[surveyId][votingIntention]++;
    });

    const result: VotingIntentionResult = { label: [], percentages: {} };

    const sortedSurveyIds = Object.keys(totalVotes).sort();

    const allIntentions: Set<string> = new Set();
    surveys.forEach((survey) => allIntentions.add(survey.votingIntention));

    const sortedIntentions = Array.from(allIntentions).sort();

    for (const surveyId of sortedSurveyIds) {
      const total = totalVotes[surveyId];
      result.label.push(surveyId);

      for (const intention of sortedIntentions) {
        const percentage =
          total > 0 && votingCounts[surveyId][intention]
            ? ((votingCounts[surveyId][intention] / total) * 100).toFixed(2)
            : "0.00";

        if (!result.percentages[intention]) {
          result.percentages[intention] = [];
        }

        result.percentages[intention].push(parseFloat(percentage));
      }
    }

    for (const intention of sortedIntentions) {
      if (!result.percentages[intention]) {
        result.percentages[intention] = sortedSurveyIds.map(() => 0);
      }
    }

    return result;
  }

  try {
    const survey = await surveyRepository.findSurvey();

    return calculateVotingIntentionPercentages(survey);
  } catch (error) {
    throw new FriendlyError({
      message: AppError.CALC_VOTING_INTENTION_ERROR,
      originalError: error,
      context: "createBrandUseCase",
    });
  }
}
