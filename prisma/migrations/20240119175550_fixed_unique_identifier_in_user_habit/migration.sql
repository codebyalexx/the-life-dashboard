-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserHabit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT DEFAULT 'Default',
    "name" TEXT NOT NULL DEFAULT 'Default',
    "repeatSchema" TEXT NOT NULL DEFAULT 'Daily',
    "moment" TEXT NOT NULL DEFAULT 'AllDay',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserHabit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserHabit" ("categoryId", "createdAt", "endsAt", "id", "moment", "name", "repeatSchema", "startAt", "userId") SELECT "categoryId", "createdAt", "endsAt", "id", "moment", "name", "repeatSchema", "startAt", "userId" FROM "UserHabit";
DROP TABLE "UserHabit";
ALTER TABLE "new_UserHabit" RENAME TO "UserHabit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
