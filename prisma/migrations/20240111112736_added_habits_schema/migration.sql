-- CreateTable
CREATE TABLE "UserHabit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT DEFAULT 'Default',
    "name" TEXT NOT NULL DEFAULT 'Default',
    "repeatSchema" TEXT NOT NULL DEFAULT 'Daily',
    "moment" TEXT NOT NULL DEFAULT 'AllDay',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserHabit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserHabitDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL DEFAULT '01011970',
    "habitId" TEXT NOT NULL,
    CONSTRAINT "UserHabitDay_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "UserHabit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT DEFAULT 'Default',
    "displayType" INTEGER NOT NULL DEFAULT 0,
    "calories" INTEGER DEFAULT 0,
    "carbs" INTEGER DEFAULT 0,
    "fat" INTEGER DEFAULT 0,
    "proteins" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserFood" ("calories", "carbs", "createdAt", "displayType", "fat", "id", "name", "proteins", "userId") SELECT "calories", "carbs", "createdAt", "displayType", "fat", "id", "name", "proteins", "userId" FROM "UserFood";
DROP TABLE "UserFood";
ALTER TABLE "new_UserFood" RENAME TO "UserFood";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserHabit_userId_key" ON "UserHabit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHabitDay_habitId_key" ON "UserHabitDay"("habitId");
