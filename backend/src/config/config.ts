
export const DATABASE_URL = `postgresql://${process.env.PG_USER}:${process.env.PG_PW}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/tiff",
] as const;

export type AllowedImageMimeType = typeof ALLOWED_IMAGE_MIME_TYPES[number];