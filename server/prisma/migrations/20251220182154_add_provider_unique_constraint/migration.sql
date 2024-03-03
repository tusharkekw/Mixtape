/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerUserId]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Provider_provider_providerUserId_key" ON "Provider"("provider", "providerUserId");
