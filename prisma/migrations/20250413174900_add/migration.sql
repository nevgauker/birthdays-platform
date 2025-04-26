/*
  Warnings:

  - Added the required column `ownerId` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "didConfirm" BOOLEAN NOT NULL DEFAULT false,
    "partyId" TEXT NOT NULL,
    CONSTRAINT "Guest_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Party" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageUrl" TEXT,
    "rsvpLink" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Party" ("address", "createdAt", "date", "description", "id", "imageUrl", "rsvpLink", "time", "title") SELECT "address", "createdAt", "date", "description", "id", "imageUrl", "rsvpLink", "time", "title" FROM "Party";
DROP TABLE "Party";
ALTER TABLE "new_Party" RENAME TO "Party";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
