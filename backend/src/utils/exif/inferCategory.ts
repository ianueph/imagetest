import { MetadataCategory } from "#/generated/prisma/client.js";

function inferCategory(tag: string): MetadataCategory {
  if (tag.startsWith("GPS")) return MetadataCategory.LOCATION;

  if (
    tag.includes("Date") ||
    tag.includes("Time")
  ) return MetadataCategory.CHRONOLOGY;

  if (
    tag.includes("Make") ||
    tag.includes("Model") ||
    tag.includes("Software")
  ) return MetadataCategory.DEVICE;

  if (
    tag.includes("Exposure") ||
    tag.includes("Shutter") ||
    tag.includes("Aperture") ||
    tag.includes("ISO")
  ) return MetadataCategory.EXPOSURE;

  if (
    tag.includes("Lens") ||
    tag.includes("Focal")
  ) return MetadataCategory.LENS;

  if (
    tag.includes("Orientation")
  ) return MetadataCategory.ORIENTATION;

  if (
    tag.includes("Color") ||
    tag.includes("WhiteBalance")
  ) return MetadataCategory.COLOR;

  if (
    tag.includes("Compression") ||
    tag.includes("Resolution") ||
    tag.includes("Processing")
  ) return MetadataCategory.IMAGE_PROCESSING;

  if (
    tag.includes("MakerNote")
  ) return MetadataCategory.MAKERNOTES;

  if (
    tag.includes("File") ||
    tag.includes("ImageWidth") ||
    tag.includes("ImageHeight")
  ) return MetadataCategory.FILE;

  return MetadataCategory.MISC;
}

export default inferCategory;