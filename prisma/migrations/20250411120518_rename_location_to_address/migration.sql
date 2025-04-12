-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageUrl" TEXT,
    "rsvpLink" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
