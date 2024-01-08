-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "displayType" INTEGER NOT NULL DEFAULT 0,
    "calories" INTEGER DEFAULT 0,
    "carbs" INTEGER DEFAULT 0,
    "fat" INTEGER DEFAULT 0,
    "proteins" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserFood" ("carbs", "createdAt", "fat", "id", "proteins", "userId") SELECT "carbs", "createdAt", "fat", "id", "proteins", "userId" FROM "UserFood";
DROP TABLE "UserFood";
ALTER TABLE "new_UserFood" RENAME TO "UserFood";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
