/*
  Warnings:

  - Added the required column `organizerID` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizerID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerID_fkey" FOREIGN KEY ("organizerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
