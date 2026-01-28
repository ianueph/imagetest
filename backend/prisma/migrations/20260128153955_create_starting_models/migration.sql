/*
  Warnings:

  - Added the required column `sha256` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upload_time` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetadataCategory" AS ENUM ('DEVICE', 'CHRONOLOGY', 'LOCATION', 'EXPOSURE', 'LENS', 'ORIENTATION', 'IMAGE_PROCESSING', 'COLOR', 'FILE', 'MAKERNOTES', 'MISC');

-- CreateEnum
CREATE TYPE "Segment" AS ENUM ('TIFF', 'XMP', 'ICC', 'IPTC', 'JFIF', 'IHDR');

-- CreateEnum
CREATE TYPE "Units" AS ENUM ('NONE', 'STRING', 'BOOLEAN', 'SECONDS', 'FSTOP', 'ISO', 'KELVIN', 'METERS', 'DEGREES', 'KILOMETERS_PER_HOUR', 'METERS_PER_SECOND', 'MILLIMETERS', 'MM_EQUIV', 'BYTES', 'PIXELS', 'PERCENT');

-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "sha256" BYTEA NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "upload_time" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ExifTag" (
    "id" SERIAL NOT NULL,
    "image_id" INTEGER NOT NULL,
    "category" "MetadataCategory" NOT NULL,
    "segment" "Segment" NOT NULL,
    "tag" TEXT NOT NULL,
    "tag_id" TEXT,
    "value" TEXT,
    "raw_value" TEXT,
    "raw_json" JSONB,
    "units" "Units" NOT NULL,

    CONSTRAINT "ExifTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExifTag_image_id_idx" ON "ExifTag"("image_id");

-- CreateIndex
CREATE INDEX "ExifTag_category_idx" ON "ExifTag"("category");

-- CreateIndex
CREATE INDEX "ExifTag_segment_idx" ON "ExifTag"("segment");

-- CreateIndex
CREATE INDEX "ExifTag_image_id_category_idx" ON "ExifTag"("image_id", "category");

-- CreateIndex
CREATE INDEX "Images_upload_time_idx" ON "Images"("upload_time");

-- AddForeignKey
ALTER TABLE "ExifTag" ADD CONSTRAINT "ExifTag_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
