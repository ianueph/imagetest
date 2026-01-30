import { Units } from "#/generated/prisma/client.js";

function inferUnits(tag: string, value: unknown): Units {
  if (typeof value === "string") return Units.STRING;
  if (typeof value === "boolean") return Units.BOOLEAN;

  if (tag.includes("ResolutionUnit")) return Units.INCHES;
  if (tag.includes("Resolution")) return Units.PIXELS;

  if (tag.includes("Date")) return Units.DATETIME;

  if (tag.includes("ShuttedSpeedValue")) return Units.APEX;
  if (tag.includes("BrightnessValue")) return Units.APEX;
  if (tag.includes("ExposureCompensation")) return Units.EV;
  if (tag.includes("ExposureTime")) return Units.SECONDS;
  if (tag.includes("FNumber") || tag.includes("Aperture")) return Units.FSTOP;
  if (tag.includes("ISO")) return Units.ISO;

  if (tag.includes("FocalLength35mm")) return Units.MM_EQUIV;
  if (tag.includes("FocalLength")) return Units.MILLIMETERS;

  if (tag.includes("GPSAltitude")) return Units.METERS;
  if (tag.includes("GPSLatitude") || tag.includes("GPSLongitude"))
    return Units.DEGREES;

  if (tag.includes("Speed")) return Units.METERS_PER_SECOND;

  if (
    tag.includes("ImageWidth") ||
    tag.includes("ImageHeight")
  ) return Units.PIXELS;

  if (tag.includes("BitsPerSample")) return Units.BYTES;

  return Units.NONE;
}

export default inferUnits;