import { Router } from "express";
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMAGE_DIR)
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), (req, res) => {
    // Upload image here
    // Uploaded image hould store to local folder 
    // Image metadata should be stored to db
});

router.get('/:id', (req, res) => {
    // Get image by ID here
});

router.delete('/:id', (req, res) => {
    // Delete image by ID here.
});

export default router;