import exifr from "exifr";
import { Prisma, Segment } from "#/generated/prisma/client.js";
import normalizeValue from "./normalizeValue.js";
import normalizeJson from "./normalizeJson.js";
import inferUnits from "./inferUnits.js";
import inferCategory from "./inferCategory.js";
import { ALLOWED_IMAGE_MIME_TYPES } from "#config/config.js";

function pushTags(
  target: Prisma.ExifTagCreateManyImageInput[],
  segment: Segment,
  data: Record<string, unknown> | null
) {
  if (!data) return;

  for (const [key, value] of Object.entries(data)) {
    target.push({
      segment,
      category: inferCategory(key),
      tag: key,
      tag_id: null,
      value: normalizeValue(value),
      raw_value: String(value),
      raw_json: normalizeJson(value),
      units: inferUnits(key, value),
    });
  }
}

async function getImageExifMetadata(
    file: Express.Multer.File
) : Promise<Prisma.ExifTagCreateManyImageInput[]> {
    let exifTags : Prisma.ExifTagCreateManyImageInput[] = []

    pushTags(
        exifTags,
        "TIFF",
        await exifr.parse(file.path, {
            tiff: true,
            ifd1: true,
            exif: true,
            gps: true,
            interop: true,
        })
    );

    pushTags(
        exifTags,
        "XMP",
        await exifr.parse(file.path, {
            xmp: true
        })
    );

    pushTags(
        exifTags,
        "ICC",
        await exifr.parse(file.path, {
            icc: true
        })
    );

    pushTags(
        exifTags,
        "IPTC",
        await exifr.parse(file.path, {
            iptc: true
        })
    );

    if (file.mimetype == ALLOWED_IMAGE_MIME_TYPES[0]) {
        pushTags(
            exifTags,
            "JFIF",
            await exifr.parse(file.path, {
                jfif: true
            })
        );
    }

    if (file.mimetype == ALLOWED_IMAGE_MIME_TYPES[1]) {
        pushTags(
            exifTags,
            "IHDR",
            await exifr.parse(file.path, {
                ihdr: true
            })
        );
    }

    return exifTags;
}

export default getImageExifMetadata;