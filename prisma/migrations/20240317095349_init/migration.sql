-- DropIndex
DROP INDEX "question_lists_email_key";

-- AlterTable
ALTER TABLE "question_lists" ALTER COLUMN "email" DROP NOT NULL;
