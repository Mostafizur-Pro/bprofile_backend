/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ClientRole" AS ENUM ('NORMAL', 'BASIC', 'STANDARD', 'ADVANCED', 'PLUS', 'PRO');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUB_ADMIN', 'SUPPER_ADMIN', 'ACCOUNT', 'EDITOR');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "data" TEXT[],
    "interest" TEXT[],
    "connect" TEXT[],
    "role" "ClientRole" NOT NULL DEFAULT 'NORMAL',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "data" TEXT[],
    "interest" TEXT[],
    "connect" TEXT[],
    "role" TEXT NOT NULL DEFAULT 'Seles and Merketing',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_number_key" ON "admins"("number");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliants_number_key" ON "cliants"("number");

-- CreateIndex
CREATE UNIQUE INDEX "cliants_email_key" ON "cliants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_number_key" ON "employees"("number");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_number_key" ON "users"("number");
