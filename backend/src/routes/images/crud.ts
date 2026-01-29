import { Router } from "express";
import multer from 'multer';
import { Exifr } from "exifr";
import { prisma } from '@/lib/prisma.js'
import { validateImageMimeType } from "#utils/image-utils.js";
import createHttpError from "http-errors";

const router = Router();
const exifr = new Exifr;
// Multer configs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMAGE_DIR)
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
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

    const filename = req.file.filename;
    await exifr.read(req.file)
    exifr.parse()
      .then(output => console.log(output));
});

router.get('/:id', (req, res) => {
    // Get image by ID here
});

router.delete('/:id', (req, res) => {
    // Delete image by ID here.
});

export default router;