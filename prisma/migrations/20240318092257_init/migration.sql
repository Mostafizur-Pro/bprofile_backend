/*
  Warnings:

  - You are about to drop the column `distrcit` on the `hall_room_posts` table. All the data in the column will be lost.
  - Added the required column `district` to the `hall_room_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hall_room_posts" DROP COLUMN "distrcit",
ADD COLUMN     "district" TEXT NOT NULL;
