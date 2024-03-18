-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'EDIT';

-- AlterTable
ALTER TABLE "message_lists" ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "message_show" DROP NOT NULL,
ALTER COLUMN "message_show_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "question_lists" ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL;

-- CreateTable
CREATE TABLE "hall_room_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "post" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "distrcit" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "client_id" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hall_room_posts_pkey" PRIMARY KEY ("id")
);
