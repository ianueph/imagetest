import { Router } from "express";
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/upload', (req, res) => {
    // Upload images here
    // Uploaded image hould store to local folder 
    // Image metadata should be stored to db
});

router.get('/:id', (req, res) => {
    // Get images by ID here
});

router.get('/metadata/:id', (req, res) => {
    // Get image metadata by ID from here.
});

router.delete('/:id', (req, res) => {
    // Delete images by ID here.
});

export default router;