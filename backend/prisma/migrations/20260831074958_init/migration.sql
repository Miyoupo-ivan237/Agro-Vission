-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT DEFAULT '',
    "phoneNumber" TEXT DEFAULT '',
    "password" TEXT,
    "passwordHash" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'farmer',
    "location" TEXT DEFAULT 'Cameroon',
    "farmSize" TEXT DEFAULT '1 Hectare',
    "preferredCrop" TEXT DEFAULT 'Cassava & Maize',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantImage" (
    "imageId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnosisId" TEXT,

    CONSTRAINT "PlantImage_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "farmerId" TEXT,
    "diseaseName" TEXT NOT NULL,
    "scientificName" TEXT DEFAULT '',
    "crop" TEXT NOT NULL DEFAULT 'General',
    "cropName" TEXT NOT NULL DEFAULT 'General',
    "symptoms" TEXT NOT NULL,
    "causes" TEXT,
    "treatment" TEXT,
    "diagnosisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.92,
    "severity" TEXT NOT NULL DEFAULT 'Moderate',
    "source" TEXT NOT NULL DEFAULT 'Offline AI Engine',
    "imageUri" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "treatmentId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,
    "treatmentType" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("treatmentId")
);

-- CreateTable
CREATE TABLE "FarmInformation" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT,
    "userId" TEXT,
    "location" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "soilCondition" TEXT NOT NULL,
    "landSize" TEXT DEFAULT '1 Hectare',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FarmInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropRecommendation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "farmerId" TEXT,
    "farmInfoId" TEXT,
    "location" TEXT DEFAULT 'Cameroon',
    "season" TEXT DEFAULT 'General',
    "soilCondition" TEXT DEFAULT 'General',
    "primaryCrop" TEXT NOT NULL,
    "secondaryCrop" TEXT,
    "reason" TEXT DEFAULT '',
    "fertilizerPlan" TEXT,
    "actionPlan" TEXT,
    "recommendationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'Offline Recommendation Engine',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CropRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "farmerId" TEXT,
    "message" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "modelUsed" TEXT NOT NULL DEFAULT 'Ollama agrovission-agronomist',
    "isOffline" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "farmerId" TEXT,
    "type" TEXT NOT NULL DEFAULT 'general',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "cropId" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT,
    "userId" TEXT,
    "farmerId" TEXT,
    "farmName" TEXT DEFAULT 'My Farm',
    "name" TEXT DEFAULT 'My Farm',
    "cropType" TEXT NOT NULL DEFAULT 'General',
    "targetProblem" TEXT,
    "growthStage" TEXT NOT NULL DEFAULT 'Vegetative',
    "healthScore" INTEGER NOT NULL DEFAULT 90,
    "pestPresent" BOOLEAN NOT NULL DEFAULT false,
    "soilMoisture" TEXT NOT NULL DEFAULT 'Optimal',
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlantImage_diagnosisId_key" ON "PlantImage"("diagnosisId");

-- AddForeignKey
ALTER TABLE "PlantImage" ADD CONSTRAINT "PlantImage_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmInformation" ADD CONSTRAINT "FarmInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRecommendation" ADD CONSTRAINT "CropRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRecommendation" ADD CONSTRAINT "CropRecommendation_farmInfoId_fkey" FOREIGN KEY ("farmInfoId") REFERENCES "FarmInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
