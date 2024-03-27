-- CreateEnum
CREATE TYPE "ClientRole" AS ENUM ('NORMAL', 'BASIC', 'STANDARD', 'ADVANCED', 'PLUS', 'PRO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'EDIT', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUB_ADMIN', 'SUPPER_ADMIN', 'ACCOUNT', 'EDITOR');

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
    "emp_id" TEXT,
    "emp_name" TEXT,
    "data" TEXT[],
    "interest" TEXT[],
    "connect" TEXT[],
    "role" "ClientRole" NOT NULL DEFAULT 'NORMAL',
    "email" TEXT,
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
    "email" TEXT,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "number" TEXT,
    "message" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "email" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_lists" (
    "id" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT,
    "image" TEXT,
    "message_show" TEXT,
    "message_show_id" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hall_room_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "post" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "client_id" TEXT,
    "like" TEXT[],
    "view" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hall_room_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paid_image" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "post" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "client_id" TEXT,
    "client_role" TEXT,
    "like" TEXT[],
    "view" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paid_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paid_video" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "post" TEXT,
    "video" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "thana" TEXT NOT NULL,
    "ward" TEXT,
    "area" TEXT,
    "road" TEXT,
    "client_id" TEXT,
    "client_role" TEXT,
    "like" TEXT[],
    "view" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paid_video_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
