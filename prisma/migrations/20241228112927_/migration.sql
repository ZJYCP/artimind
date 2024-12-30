-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sharePath" TEXT NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Search_id_key" ON "Search"("id");
