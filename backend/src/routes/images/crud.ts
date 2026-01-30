import { Router } from "express";
import multer from 'multer';
import { prisma } from '@/lib/prisma.js'
import { validateImageMimeType } from "#utils/image-utils.js";
import createHttpError from "http-errors";
import hashFile from "#utils/hashFile.js";
import getImageExifMetadata from "#utils/exif/getImageExifMetadata.js";

const router = Router();
// Multer configs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMAGE_DIR)
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let fnArray = file.originalname.split(".");
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let filename = fnArray[fnArray.length - 2] + '-' + uniqueSuffix + '.' + extension;
    cb(null, filename);
  },
})
const upload = multer({ 
  storage: storage, 
  fileFilter: function (req, file, cb) {
    validateImageMimeType(file);
    cb(null, true);
  },
});

router.post('/upload', upload.single('photo'), async (req, res, next) => {
    // Upload image here
    // Uploaded image hould store to local folder 
    // Image metadata should be stored to db
    if (!req.file) { return next(createHttpError(400))};

    const exifTags = await getImageExifMetadata(req.file);
    if (!Object.keys(exifTags)) { console.log(`File does not have exifs.`)};

    const imageId = await prisma.images.create({
      data: {
        path: req.file.path,
        sha256: await hashFile(req.file.path),
        exif_tags: {
          createMany: {
            data: exifTags
          }
        }
      }
    });

    console.log(`Created a new entry for ${req.file.filename}, id: ${imageId}`)

    res.send(200);
});

router.get('/:id', (req, res) => {
    // Get image by ID here
});

router.delete('/:id', (req, res) => {
    // Delete image by ID here.
});

export default router;