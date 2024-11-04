-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "surveyDate" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "votingIntention" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);
