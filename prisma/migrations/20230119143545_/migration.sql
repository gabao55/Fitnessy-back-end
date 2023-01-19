/*
  Warnings:

  - Changed the type of `name` on the `muscle_groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "muscle_groups" DROP COLUMN "name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- DropEnum
DROP TYPE "muscle_groups_names";
