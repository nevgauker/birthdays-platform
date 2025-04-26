/*
  Warnings:

  - Added the required column `updatedAt` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Party" ("address", "createdAt", "date", "description", "id", "imageUrl", "ownerId", "rsvpLink", "time", "title") SELECT "address", "createdAt", "date", "description", "id", "imageUrl", "ownerId", "rsvpLink", "time", "title" FROM "Party";
DROP TABLE "Party";
ALTER TABLE "new_Party" RENAME TO "Party";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
