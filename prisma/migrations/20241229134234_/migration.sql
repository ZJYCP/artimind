/*
  Warnings:

  - You are about to drop the column `message` on the `Search` table. All the data in the column will be lost.
  - Added the required column `messages` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Search" DROP COLUMN "message",
ADD COLUMN     "messages" JSONB NOT NULL;
