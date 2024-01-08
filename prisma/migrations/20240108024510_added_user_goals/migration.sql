-- CreateTable
CREATE TABLE "UserGoals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calories" INTEGER NOT NULL DEFAULT 1800,
    "carbs" INTEGER NOT NULL DEFAULT 250,
    "fat" INTEGER NOT NULL DEFAULT 60,
    "proteins" INTEGER NOT NULL DEFAULT 120,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");
