/*
  Warnings:

  - You are about to drop the column `created_at` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "created_at",
DROP COLUMN "is_read",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'normal',
ADD COLUMN     "readAt" TIMESTAMP(3),
ADD COLUMN     "relatedDataId" TEXT,
ADD COLUMN     "relatedType" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "appUsageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3);
