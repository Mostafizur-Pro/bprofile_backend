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
