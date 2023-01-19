/*
  Warnings:

  - Changed the type of `name` on the `muscle_groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "muscle_groups_names" AS ENUM ('Cardiovascular', 'Shoulder', 'Chest', 'Back', 'Biceps', 'Triceps', 'Forearm', 'Abdomen', 'Core', 'Quadriceps', 'Gluteus', 'Hamstrings', 'Calves');

-- AlterTable
ALTER TABLE "muscle_groups" DROP COLUMN "name",
ADD COLUMN     "name" "muscle_groups_names" NOT NULL;
