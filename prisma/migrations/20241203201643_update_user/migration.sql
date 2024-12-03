-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_date" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "language_code" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "username" TEXT;
