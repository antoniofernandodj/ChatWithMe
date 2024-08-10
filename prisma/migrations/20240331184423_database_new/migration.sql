-- CreateTable
CREATE TABLE "users" (
    "uuid" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "roms" (
    "uuid" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "roms_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserOnRooms" (
    "userUUID" VARCHAR(36) NOT NULL,
    "roomUUID" VARCHAR(36) NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserOnRooms_pkey" PRIMARY KEY ("userUUID","roomUUID")
);

-- CreateTable
CREATE TABLE "Message" (
    "uuid" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "userUUID" VARCHAR(36) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roms_uuid_key" ON "roms"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnRooms_userUUID_key" ON "UserOnRooms"("userUUID");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnRooms_roomUUID_key" ON "UserOnRooms"("roomUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Message_uuid_key" ON "Message"("uuid");

-- AddForeignKey
ALTER TABLE "UserOnRooms" ADD CONSTRAINT "UserOnRooms_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRooms" ADD CONSTRAINT "UserOnRooms_roomUUID_fkey" FOREIGN KEY ("roomUUID") REFERENCES "roms"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
