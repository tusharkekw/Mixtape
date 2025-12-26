-- CreateTable
CREATE TABLE "ConversionJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConversionJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConversionJob" ADD CONSTRAINT "ConversionJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
