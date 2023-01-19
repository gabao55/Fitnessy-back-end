/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `exercise_muscle_groups` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `exercise_muscle_groups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercise_muscle_groups" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "muscle_groups_names";
