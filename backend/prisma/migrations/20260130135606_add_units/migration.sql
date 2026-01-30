-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Units" ADD VALUE 'DATETIME';
ALTER TYPE "Units" ADD VALUE 'APEX';
ALTER TYPE "Units" ADD VALUE 'INCHES';
ALTER TYPE "Units" ADD VALUE 'EV';
ALTER TYPE "Units" ADD VALUE 'BUFFER';
