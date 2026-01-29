import { ALLOWED_IMAGE_MIME_TYPES, AllowedImageMimeType } from "#config/config.js";
import createHttpError from "http-errors";

export function validateImageMimeType(file: { mimetype: string }): 
asserts file is { mimetype: AllowedImageMimeType } {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype as AllowedImageMimeType)) {
    createHttpError(400, `Unsupported file type: ${file.mimetype}, Supported filetypes are: ${ALLOWED_IMAGE_MIME_TYPES}`)
  }
}